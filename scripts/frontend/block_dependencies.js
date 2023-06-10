// const de package.json
const packageJson = require('../../package.json');

// dependências bloqueadas
const blockedDependencies = packageJson.blockedDependencies || {};

const { dependencies } = packageJson;
const { devDependencies } = packageJson;

const blockedDependenciesNames = Object.keys(blockedDependencies);

const blockedDependenciesFound = blockedDependenciesNames.filter(
    (blockedDependency) => dependencies[blockedDependency] || devDependencies[blockedDependency]
);

if (blockedDependenciesFound.length) {
    console.log('as dependências de package.json a seguir não estão disponíveis:');

    blockedDependenciesFound.forEach((blockedDependency) => {
        const infoLink = blockedDependencies[blockedDependency];

        console.log(`- ${blockedDependency}: veja ${infoLink} para mais informações.`);
    });

    process.exit(-1);
}