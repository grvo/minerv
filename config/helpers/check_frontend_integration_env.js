// consts
const fs = require('fs');
const isESLint = require('./is_eslint');

const GRAPHQL_SCHEMA_PATH = 'tmp/tests/graphql/gitlab_schema.graphql';
const GRAPHQL_SCHEMA_JOB = 'bundle exec rake gitlab:graphql:schema:dump';

const shouldIgnoreWarnings = JSON.parse(process.env.GL_IGNORE_WARNINGS || '0');

const failCheck = (message) => {
    console.error(message);

    if (!shouldIgnoreWarnings) {
        process.exit(1);
    }
};

const checkGraphqlSchema = () => {
    if (!fs.existsSync(GRAPHQL_SCHEMA_PATH)) {
        const message = `
erro: era esperado encontrar "${GRAPHQL_SCHEMA_PATH}" porém o arquivo não existe. tente rodar:
        
        ${GRAPHQL_SCHEMA_JOB}
`;

        failCheck(message);
    }
};

const check = () => {
    if (isESLint(module)) {
        return;
    }

    checkGraphqlSchema();
};

module.exports = check;