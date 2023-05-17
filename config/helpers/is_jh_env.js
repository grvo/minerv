// consts
const fs = require('fs');
const path = require('path');

// consts locais
const IS_EE = require('./is_ee_env');

const ROOT_PATH = path.resolve(__dirname, '../..');

// o foss_only será sempre uma string ou nil
// nil ou string vazia resultará em usar o padrão value: false
//
// o behavior precisa ser sincronizado com lib/gitlab.rb: gitlab.jh?
// ao passo que is_ee já satisfaz as condições de não ser foss_only
//
// const isFossOnly = JSON.parse(process.env.FOSS_ONLY || 'false');

const isEEOnly = JSON.parse(process.env.EE_ONLY || 'false');

module.exports = IS_EE && !isEEOnly && fs.existsSync(path.join(ROOT_PATH, 'jh'));