import type { Units } from './types/Units';
import type { ParseOptions } from './types/Options';
import {
	day,
	en,
	es,
	global,
	hour,
	langs,
	late,
	minute,
	month,
	second,
	week,
	year,
	numberRegex
} from './utils';
import escape = require('escape-string-regexp');

export = function parse(
	str: string,
	idt?: boolean | ParseOptions,
	options?: ParseOptions
): string | number {
	if (typeof str !== 'string') throw new Error('Invalid type.');
	str = clean(str);
	let length: boolean = false;
	let separator: string[] = [' '];
	let language: 'es' | 'en' | undefined = undefined;
	let opt: boolean = true;
	let strict: boolean = false;
	if (idt !== undefined) {
		if (!['boolean', 'object'].includes(typeof idt))
			throw new Error("Options doesn't have a valid type.");

		if (typeof idt === 'boolean') length = idt;
		else {
			opt = false;
			check(idt);
			language = idt.language;
			if (idt.separator !== undefined) separator = idt.separator as string[];
			if (idt.strict !== undefined) strict = idt.strict;
		}
	}
	if (options !== undefined && opt) {
		if (typeof options !== 'object') throw new Error("Options doesn't have a valid type.");

		check(options);
		language = options.language;
		if (options.separator !== undefined) separator = options.separator as string[];
		if (options.strict !== undefined) strict = options.strict;
	}
	const units: string =
		language !== undefined
			? langs[language].join('|') + '|' + global.join('|')
			: es.join('|') + '|' + en.join('|') + '|' + global.join('|');
	let matches = str.match(new RegExp(`${numberRegex} *(${units})`, 'gi'));

	if (matches === null) return 0;

	const valid = isValid(separator, str, strict, units);
	if (valid === undefined) return 0;
	matches = valid;

	const final = {
		years: 0,
		months: 0,
		weeks: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	let time: number = 0;
	for (let match of matches) {
		const n = parseFloat(match);
		if (n === 0) continue;

		const type = match
			.replace(
				new RegExp(
					`(\\d|${separator
						.map((x) =>
							Array.from(x)
								.map((y) =>
									['d', 'w', 's', 'b'].includes(y.toLowerCase())
										? y
										: `\\${y}`
								)
								.join('')
						)
						.join('|')})+`,
					'g'
				),
				''
			)
			.trim() as Units;

		switch (type) {
			case 'years':
			case 'anos':
			case 'year':
			case 'ano':
			case 'yrs':
			case 'yr':
			case 'y':
			case 'a':
				final.years += n;
				time += n * year;
				break;
			case 'months':
			case 'meses':
			case 'month':
			case 'mes':
			case 'mo':
				final.months += n;
				time += n * month;
				break;
			case 'weeks':
			case 'semanas':
			case 'week':
			case 'semana':
			case 'w':
				final.weeks += n;
				time += n * week;
				break;
			case 'days':
			case 'dias':
			case 'day':
			case 'dia':
			case 'd':
				final.days += n;
				time += n * day;
				break;
			case 'hours':
			case 'horas':
			case 'hour':
			case 'hora':
			case 'hrs':
			case 'hr':
			case 'h':
				final.hours += n;
				time += n * hour;
				break;
			case 'minutes':
			case 'minutos':
			case 'minute':
			case 'minuto':
			case 'mins':
			case 'min':
			case 'm':
				final.minutes += n;
				time += n * minute;
				break;
			case 'seconds':
			case 'segundos':
			case 'second':
			case 'segundo':
			case 'secs':
			case 'segs':
			case 'sec':
			case 'seg':
			case 's':
				final.seconds += n;
				time += n * second;
				break;
			default:
				time += n;
		}
	}

	if (length) {
		const name = (Object.entries(final) as [keyof typeof final, number][])
			.filter((x) => x[1] > 0)
			.map((x) => {
				const pos: string =
					x[1] >= 2
						? late[language ?? 'en'][x[0]].plural
						: late[language ?? 'en'][x[0]].name;

				return `${x[1]} ${pos}`;
			});

		return name.join(', ');
	}

	return time;
};

function isValid(
	separators: string[],
	str: string,
	strict: boolean,
	units: string
): string[] | undefined {
	const separator = separators.map((x) => escape(x)).join('|');
	const unit = `${numberRegex} *(${units})`;
	const [newMatch] =
		str.match(
			new RegExp(
				`${strict ? '^' : ''}${numberRegex} *(${units})(${separator}${unit})*${
					strict ? '$' : ''
				}`
			)
		) ?? [];
	if (newMatch === undefined) return undefined;
	const matches = newMatch.match(new RegExp(unit, 'g'));
	if (matches === null) return undefined;

	return matches;
}

function check(options: ParseOptions) {
	if (options.language !== undefined && !['es', 'en'].includes(options.language))
		options.language = undefined;
	if (options.separator !== undefined) {
		if (
			typeof options.separator !== 'string' &&
			!(
				Array.isArray(options.separator) &&
				options.separator.every((x) => ['number', 'string'].includes(typeof x))
			)
		)
			options.separator = [' '];
		else if (typeof options.separator === 'string')
			options.separator = [options.separator];
	}
	if (typeof options.strict !== 'boolean') options.strict = false;
	return options;
}

function clean(str: string): string {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
}
