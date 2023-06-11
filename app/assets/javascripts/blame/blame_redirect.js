// imports locais
import {
    setUrlParams
} from '~/lib/utils/url_utility';

import {
    createAlert
} from '~/alert';

import {
    __
} from '~/locale';

export default function redirectToCorrectBlamePage() {
    // const para hash
    const { hash } = window.location;

    // consts de paginação
    const linesPerPage = parseInt(document.querySelector('.js-per-page').dataset.perPage, 10);
    const params = new URLSearchParams(window.location.search);

    const currentPage = parseInt(params.get('page'), 10);
    const isPaginationDisabled = params.get('no_pagination');

    if (hash && linesPerPage && !isPaginationDisabled) {
        const lineNumber = parseInt(hash.split('#L')[1], 10);
        const pageToRedirect = Math.ceil(lineNumber / linesPerPage);

        const isRedirectNeeded = (pageToRedirect > 1 && pageToRedirect !== currentPage) || pageToRedirect < currentPage;

        if (isRedirectNeeded) {
            createAlert({
                message: __('aguarde alguns instantes enquanto carregamos o histórico do arquivo para esta linha.')
            });

            window.location.href = setUrlParams({
                page: pageToRedirect
            });
        }
    }
}