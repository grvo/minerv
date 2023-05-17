// consts
const fs = require('fs');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../..');

// o foss_only será sempre uma string ou nil
// nil ou string vazia resultará em usar o padrão value: false
//
// o behavior precisa ser sincronizado com lib/gitlab.rb: gitlab.ee?
const isFossOnly = JSON.parse(process.env.FOSS_ONLY || 'false');

module.exports = fs.existsSync(
    path.join(
        ROOT_PATH,
        
        'ee',
        'app',
        'models',
        'license.rb'
    )
) && !isFossOnly;