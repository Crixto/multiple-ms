import type { ParseOptions } from './Options';

export default function parser(ms: string): number;
export default function parser(ms: string, length: true): string;
export default function parser(ms: string, length: false): number;
export default function parser(ms: string, options: ParseOptions): number;
export default function parser(ms: string, length: true, options: ParseOptions): string;
export default function parser(ms: string, length: false, options: ParseOptions): number;
