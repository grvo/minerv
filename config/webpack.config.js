// eslint-disable-next-line import/order
const crypto = require('./helpers/patched_crypto');

// consts de vue
const { VUE_VERSION: EXPLICIT_VUE_VERSION } = process.env;

if (![undefined, '2', '3'].includes(EXPLICIT_VUE_VERSION)) {
    throw new Error(
        `valor vue_version inválido: ${EXPLICIT_VUE_VERSION}. apenas '2' e '3' é suportado`
    );
}

const USE_VUE3 = EXPLICIT_VUE_VERSION === '3';

if (USE_VUE3) {
    console.log('[v] usando vue.js 3');
}

const VUE_LOADER_MODULE = USE_VUE3 ? 'vue-loader-vue3' : 'vue-loader';

// consts de dependências
const fs = require('fs');
const path = require('path');

// consts de versões das dependências
const BABEL_VERSION = require('@babel/core/package.json').version;
const GITLAB_WEB_IDE_VERSION = require('@gitlab/web-ide/package.json').version;

const BABEL_LOADER_VERSION = require('babel-loader/package.json').version;