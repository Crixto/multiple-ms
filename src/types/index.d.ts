import type { ParseOptions } from './Options';

export default function parser(ms: string): number;
export default function parser(ms: string, options: ParseOptions): number;
export default function parser(ms: string, length: boolean): string;
export default function parser(ms: string, length: boolean, options: ParseOptions): string;
