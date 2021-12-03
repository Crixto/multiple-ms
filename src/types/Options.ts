export interface ParseOptions {
	language?: 'es' | 'en';
	separator?: string | string[];
	strict?: boolean;
}

export interface Props {
	name: string;
	plural: string;
}
