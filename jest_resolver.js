// consts
const fs = require('fs');

// capturar resolver de jest padrão para detectar fixtures de frontend ausentes
module.exports = (request, options) => {
    try {
        return options.defaultResolver(request, options);
    } catch (e) {
        if (request.match(/tmp\/tests\/frontend\/fixtures/) && !fs.existsSync(request)) {
            console.error(
                '\x1b[1m\x1b[41m\x1b[30m %s \x1b[0m %s',
                '!',

                `arquivo fixture ${request} não existe. você rodou as fixtures de frontend do bin/rake? você pode também baixar as fixtures de gitlab-org/gitlab. veja a documentação de fixtures para mais informações.`
            );
        }

        throw e;
    }
};