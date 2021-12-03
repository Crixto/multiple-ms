import type { Units } from './types/Units';
import type { ParseOptions, Props } from './types/Options';
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 4;
const year = day * 365;

const len: { [x: string]: Props } = {
	years: {
		name: 'year',
		plural: 'years'
	},
	months: {
		name: 'month',
		plural: 'months'
	},
	weeks: {
		name: 'week',
		plural: 'weeks'
	},
	days: {
		name: 'day',
		plural: 'days'
	},
	hours: {
		name: 'hour',
		plural: 'hours'
	},
	minutes: {
		name: 'minute',
		plural: 'minutes'
	},
	seconds: {
		name: 'second',
		plural: 'seconds'
	}
};

const les: { [x: string]: Props } = {
	years: {
		name: 'año',
		plural: 'años'
	},
	months: {
		name: 'mes',
		plural: 'meses'
	},
	weeks: {
		name: 'semana',
		plural: 'semanas'
	},
	days: {
		name: 'día',
		plural: 'días'
	},
	hours: {
		name: 'hora',
		plural: 'horas'
	},
	minutes: {
		name: 'minuto',
		plural: 'minutos'
	},
	seconds: {
		name: 'segundo',
		plural: 'segundos'
	}
};

const es: string[] = [
	'años?',
	'a',
	'mes(es)?',
	'semanas?',
	'dias?',
	'horas?',
	'minutos?',
	'segundos?',
	'segs?'
];
const en: string[] = [
	'years?',
	'yrs?',
	'months?',
	'mo',
	'weeks?',
	'days?',
	'hours?',
	'minutes?',
	'seconds?',
	'secs?'
];
const global: string[] = ['y', 'w', 'd', 'hrs?', 'h', 'mins?', 'm', 's'];

const langs = {
	es,
	en
};

const late: { es: { [y: string]: Props }; en: { [y: string]: Props } } = {
	es: les,
	en: len
};

export = function parse(
	str: string,
	idt?: boolean | ParseOptions,
	options?: ParseOptions
): string | number | undefined {
	str = clean(str);
	let length: boolean = false;
	let separator: string[] = [' '];
	let language: 'es' | 'en' | undefined = undefined;
	let opt: boolean = true;
	let strict: boolean = true;
	if (typeof str !== 'string') throw new Error(`Invalid type, espected type of "string", got "${typeof str}"`);
	if (idt !== undefined) {
		if (!['boolean', 'object'].includes(typeof idt))
			throw new Error(`Invalid type, espected type of "boolean" or "object", got "${typeof idt}"`);

		if (typeof idt === 'boolean') length = idt;
		else {
			opt = false;
			check(idt);
			language = idt.language;
			if (idt.separator !== undefined) separator = idt.separator as string[];
			if (idt.strict !== undefined) strict = idt.strict;
		}
	}
	if (options !== undefined && opt === true) {
		if (typeof options !== 'object') throw new Error(`Invalid type, espected type of "object", got "${typeof idt}"`);

		check(options);
		language = options.language;
		if (options.separator !== undefined) separator = options.separator as string[];
		if (options.strict !== undefined) strict = options.strict;
	}
	const units: string =
		language !== undefined
			? langs[language].join('|') + global.join('|')
			: es.join('|') + en.join('|') + global.join('|');
	const matches = str.match(new RegExp(`\\d+ *(${units})`, 'gi'));

	if (matches === null || (strict && !isValid(matches, separator, str))) return undefined;

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
	for (const match of matches) {
		const n = parseFloat(match);
		if (n <= 0) continue;

		const type = match
			.replace(
				new RegExp(
					`(\\d|${separator
						.map((x) =>
							Array.from(x)
								.map((x) => `\\${x}`)
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
			case 'años':
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
					x[1] >= 2 ? late[language ?? 'en'][x[0]].plural : late[language ?? 'en'][x[0]].name;

				return `${x[1]} ${pos}`;
			});

		if (name.length === 0) return undefined;
		return name.join(', ');
	}

	return time;
};

function isValid(matches: string[], separators: string[], str: string): boolean {
	return new RegExp(
		`^${matches.join(
			`(${separators
				.map((x) =>
					Array.from(x)
						.map((x) => `\\${x}`)
						.join('')
				)
				.join('|')})`
		)}$`
	).test(str.trim());
	// for (const separator of separators) {
	// 	if (matches.join(separator) === str) return true;
	// }
	// return false;
}

function check(options: ParseOptions) {
	if ('language' in options) {
		if (!['es', 'en'].includes(options.language!)) options.language = undefined;
	}
	if ('separator' in options) {
		if (
			typeof options.separator !== 'string' &&
			!(
				Array.isArray(options.separator) &&
				options.separator.every((x) => ['number', 'string'].includes(typeof x))
			)
		)
			options.separator = [' '];
		else if (typeof options.separator === 'string') options.separator = [options.separator];
	}
	if (typeof options.strict !== 'boolean')
		options.strict = false;
	return options;
}

function clean(str: string): string {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
}
