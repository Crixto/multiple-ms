import type { Props } from './types';

export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;
export const week = day * 7;
export const month = week * 4;
export const year = day * 365;

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

export const es: string[] = [
	'a(ños?)?',
	'mes(es)?',
	'semanas?',
	'dias?',
	'horas?',
	'minutos?',
	'segundos?',
	'segs?'
];
export const en: string[] = [
	'years?',
	'yrs?',
	'mo(nths?)?',
	'weeks?',
	'days?',
	'hours?',
	'minutes?',
	'seconds?',
	'secs?'
];
export const global: string[] = ['y', 'w', 'd', 'hrs?', 'h', 'mins?', 'm', 's'];

export const langs = {
	es,
	en
};

export const late: { es: { [y: string]: Props }; en: { [y: string]: Props } } = {
	es: les,
	en: len
};

export const numberRegex = '-?\\d+(\\.\\d+)?';
