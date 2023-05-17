// consts
const fs = require('fs');

// consts locais
const IS_JH = require('./config/helpers/is_jh_env');
// todo: const baseConfig = require('./jest.config.base');

// todo: remover existssync ao passo que jh adiciona jest.config.js
if (IS_JH && fs.existsSync('./jh/jest.config.js')) {
    // não explicitar com regras eslint-disable
    
    // eslint-disable-next-line
    module.exports = require('./jh/jest.config');
} else {
    module.exports = {
        ...baseConfig('spec/frontend')
    };
}