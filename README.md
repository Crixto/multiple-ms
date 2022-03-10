# Multiple ms

Convert a string to milliseconds with a simple format.

## Install

```sh
$ npm install multiple-ms
```

## Examples

```js
const parse = require('multiple-ms');

parse('1 hour'); // 3600000
parse('1_100 s'); // 1100000
parse('3d', true); // 3 days
parse('2w hi', { strict: true }); // NaN
parse('2h, 30m hi 80 hours', { separator: ', ' }); // 9000000
parse('2h 30m', { separator: ', ', strict: true }); // NaN
parse('2 h', { language: 'es', length: true }); // 2 horas
parse('2 horas', { language: 'en', strict: true }); // NaN
```

## Usage

| Parameter | Type                                     | Required | Description                            |
| --------- | ---------------------------------------- | -------- | -------------------------------------- |
| str       | string                                   | ✅       | The string to convert to milliseconds. |
| options   | boolean or [ParseOptions](#ParseOptions) | ❌       | The conversion options.                |

### ParseOptions

All properties are optional.

| Property  | Type               | Description                                        |
| --------- | ------------------ | -------------------------------------------------- |
| language  | string             | The language that will be used for the conversion. |
| separator | string or string[] | The strings separator.                             |
| strict    | boolean            | If the conversion run on strict mode.              |
| length    | boolean            | If the result is converted to string.              |

## License

[MIT © Cristo](./LICENSE)
