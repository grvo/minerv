// imports de dependências
import $ from 'jquery';

// expor jquery para que as especificações usando plug-ins do jquery possam ser importadas de maneira adequada
//
// https://gitlab.com/gitlab-org/gitlab/issues/12448
global.$ = $;
global.jQuery = $;

// testes de falha para solicitações não simuladas
$.ajax = () => {
    const err = new Error(
        'chamada jquery.ajax() inesperada e não simulada. certifique-se de zombar de jquery.ajax() em testes.'
    );

    global.fail(err);

    throw err;
};

// exports
export default $;