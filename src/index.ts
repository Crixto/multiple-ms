import type { ParseOptions, ResolvedOptions, Units } from './types';
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

export = function parse<L extends boolean = false>(
	str: string,
	opt?: L | ParseOptions<L>
): string | number | null {
	if (typeof str !== 'string') throw new TypeError('Invalid type.');
	str = clean(str);
	const options: ResolvedOptions = {
		length: false,
		separator: [' '],
		strict: false
	};
	if (opt !== undefined) {
		if (!['boolean', 'object'].includes(typeof options))
			throw new TypeError("Options doesn't have a valid type.");

		if (typeof opt === 'boolean') options.length = opt;
		else Object.assign(options, check(opt));
	}
	const units: string =
		options.language !== undefined
			? langs[options.language].join('|') + '|' + global.join('|')
			: es.join('|') + '|' + en.join('|') + '|' + global.join('|');
	const matches = isValid(options.separator, str, options.strict, units);
	if (matches === undefined) return options.length ? null : NaN;

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
		if (n === 0 || isNaN(n)) continue;

		const type = match.slice(n.toString().length).trim() as Units;

		switch (type) {
			case 'years':
			case 'años':
			case 'year':
			case 'año':
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

	if (options.length) {
		const name = (Object.entries(final) as [keyof typeof final, number][])
			.filter((x) => x[1] > 0)
			.map((x) => {
				const pos: string =
					x[1] >= 2 || x[1] <= -2
						? late[options.language ?? 'en'][x[0]].plural
						: late[options.language ?? 'en'][x[0]].name;

				return `${x[1]} ${pos}`;
			});

		if (name.length === 0) return null;
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
	const separator = `(${separators.map((x) => escape(x)).join('|')})`;
	const [newMatch] =
		str.match(
			new RegExp(
				`${
					strict ? '^' : ''
				}${numberRegex} *(${units})(${separator}${numberRegex} *(${units}))*${
					strict ? '$' : ''
				}`,
				'i'
			)
		) ?? [];
	if (newMatch === undefined) return undefined;
	const matches = newMatch.split(new RegExp(separator, 'i'));

	return matches;
}

function check(options: ParseOptions<boolean>) {
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
	if (typeof options.length !== 'boolean') options.length = true;
	return options;
}

function clean(str: string): string {
	return str
		.normalize('NFD')
		.replace(/([\u0300-\u0302]|[\u0304-\u030f])/g, '')
		.normalize()
		.toLowerCase();
}
