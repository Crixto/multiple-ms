import type { ParseOptions } from '.';

declare function parse(ms: string): number;
declare function parse<L extends boolean>(
	ms: string,
	length: L
): L extends true ? string | null : number;
declare function parse<L extends boolean = false>(
	ms: string,
	options: ParseOptions<L>
): L extends true ? string | null : number;

export = parse;
