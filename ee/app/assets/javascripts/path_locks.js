// imports
import $ from 'jquery';
import axios from '~/lib/utils/axios_utils';

import { createAlert } from '~/alert';
import { confirmAction } from '~/lib/utils/confirm_via_gl_modal/confirm_via_gl_modal';
import { sprintf, __ } from '~/locale';

export default function initPathLocks(url, path) {
    $('a.path-lock').on('click', async (e) => {
        e.preventDefault();

        const { dataset } = e.target;

        const message =
            dataset.state === 'lock'
                ? __('você tem certeza que deseja trancar %{path}?')
                : __('você tem certeza que deseja destrancar %{path}?');

        const confirmed = await confirmAction(sprintf(message, { path }));

        if (!confirmed) {
            return;
        }

        axios
            .post(url, {
                path
            })

            .then(() => {
                window.location.reload();
            })

            .catch(() => createAlert({
                message: __('ocorreu um erro ao tentar inicializar os paths locks')
            }));
    });
}