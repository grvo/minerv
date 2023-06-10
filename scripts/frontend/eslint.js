// const de dependência
const { spawn } = require('child_process');

// função para rodar o eslint
const runEslint = () => {
    const [, , ...args] = process.argv;

    const child = spawn(`yarn`, ['internal:eslint', ...args], {
        stdio: 'inherit'
    });

    child.on('exit', (code) => {
        process.exitCode = code;

        if (code === 0) {
            return;
        }

        console.log(`
se você estiver vendo ofensas @graphql-eslint, o dump do esquema graphql local pode estar desatualizado.
considere atualizá-lo executando \`./scripts/dump_graphql_schema\`.
        `);
    });
};

runEslint();