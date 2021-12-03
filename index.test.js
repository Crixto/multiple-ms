const parse = require('./dist/index');

console.log(
	parse('1 day 2 hours', true, {
		language: 'en'
	})
);
