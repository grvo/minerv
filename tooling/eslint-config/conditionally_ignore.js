/* eslint-disable import/no-commonjs */

// consts de ambientes ee e jh
const IS_EE = require('../../config/helpers/is_ee_env');
const IS_JH = require('../../config/helpers/is_jh_env');

// todos os patterns
const allPatterns: [
	// ambiente ee
	{
		ignore: !IS_EE,
		pattern: 'ee/**/*.*'
	},
	
	// ambiente jihu
	{
		ignore: !IS_JH,
		pattern: 'jh/**/*.*'
	}
];

// patterns ignorados
const ignorePatterns = allPatterns.filter((x) => x.ignore).map((x) => x.pattern);

// exportando os patterns ignorados
module.exports = { ignorePatterns };
