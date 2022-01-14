import type { ParseOptions } from './Options';

declare function parser(ms: string): number;
declare function parser(ms: string, length: true): string | null;
declare function parser(ms: string, length: false): number;
declare function parser(ms: string, options: ParseOptions): number;
declare function parser(ms: string, length: true, options: ParseOptions): string | null;
declare function parser(ms: string, length: false, options: ParseOptions): number;

export = parser;
