#!/usr/bin/env node

if (process.env.RAILS_ENV !== 'production') {
    console.log(
        `rails_env não está setado para 'production': ${process.env.RAILS_ENV} - não está executando a checagem`
    );

    process.exit(0);
}

// consts de dependências
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const pjs = require('postcss');

const paths = glob.sync('public/assets/page_bundles/_mixins_and_variables_and_functions*.css', {
    cwd: path.join(__dirname, '..', '..')
});

if (!paths[0]) {
    console.log('não foi possível encontrar o arquivo de testes mixins');

    process.exit(1);
}

console.log(`checando ${paths[0]} para efeitos sides`);

const file = fs.readFileSync(paths[0], 'utf-8');

const parsed = pjs.parse(file);

if (parsed.nodes.every((node) => ['comment', 'atrule'].includes(node.type))) {
    console.log('o arquivo não apresentou nenhum efeitos sides, está tudo bem.');

    process.exit(0);
}

console.log(`pelo menos um estilo indesejado foi introduzido.`);

process.exit(1);