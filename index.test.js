const parse = require('./dist/index');

console.log(
	parse('1 day, 2 hours | 3 minutes 891j', {
		language: 'en',
		separator: [' | ', ', '],
		strict: false
	})
);
