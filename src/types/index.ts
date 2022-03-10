export interface ParseOptions<L extends boolean> {
	language?: 'es' | 'en';
	separator?: string | string[];
	strict?: boolean;
	length?: L;
}

export interface ResolvedOptions extends ParseOptions<boolean> {
	separator: string[];
	strict: boolean;
	length: boolean;
}

export interface Props {
	name: string;
	plural: string;
}

export type Units =
	| 'years'
	| 'años'
	| 'year'
	| 'año'
	| 'yrs'
	| 'yr'
	| 'y'
	| 'a'
	| 'months'
	| 'meses'
	| 'month'
	| 'mes'
	| 'mo'
	| 'weeks'
	| 'semanas'
	| 'week'
	| 'semana'
	| 'w'
	| 'days'
	| 'dias'
	| 'day'
	| 'dia'
	| 'd'
	| 'hours'
	| 'horas'
	| 'hour'
	| 'hora'
	| 'hrs'
	| 'hr'
	| 'h'
	| 'minutes'
	| 'minutos'
	| 'minute'
	| 'minuto'
	| 'mins'
	| 'min'
	| 'm'
	| 'seconds'
	| 'segundos'
	| 'second'
	| 'segundo'
	| 'secs'
	| 'segs'
	| 'sec'
	| 'seg'
	| 's';
