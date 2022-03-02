# Multiple ms

Convert a string to milliseconds with a simple format.

## Install

```sh
$ npm install multiple-ms
```

## Example

```js
const parser = require('multiple-ms');

parser('1 hour'); // 3600000
parser('3d', true); // 3 days
parser('2w hi', { strict: true }); // NaN
parser('2h, 30m hi 80 hours', { separator: ', ' }); // 9000000
parser('2h 30m', { separator: ', ', strict: true }); // NaN
parser('2 h', true, { language: 'es' }); // 2 horas
parser('2 horas', { language: 'en', strict: true }); // NaN
```

## Usage

| Parameter | Type                                     | Required | Description                            |
| --------- | ---------------------------------------- | -------- | -------------------------------------- |
| str       | string                                   | ✅       | The string to convert to milliseconds. |
| length    | boolean or [ParseOptions](#ParseOptions) | ❌       | If the result is converted to string.  |
| options   | [ParseOptions](#ParseOptions)            | ❌       | The conversion options.                |

### ParseOptions

All properties are optional.

| Property  | Type               | Description                                        |
| --------- | ------------------ | -------------------------------------------------- |
| language  | string             | The language that will be used for the conversion. |
| separator | string or string[] | The strings separator.                             |
| strict    | boolean            | If the conversion run on strict mode.              |

## License

[MIT © Cristo](./LICENSE)
