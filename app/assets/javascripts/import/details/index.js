// imports de dependências
import Vue from 'vue';

// imports locais
import ImportDetailsApp from './components/import_details_app.vue';

// exports
export default () => {
    const el = document.querySelector('.js-import-details');

    if (!el) {
        return null;
    }

    const { failuresPath } = el.dataset;

    return new Vue({
        el,

        name: 'ImportDetailsRoot',

        provide: {
            failuresPath
        },

        render(createElement) {
            return createElement(ImportDetailsApp);
        }
    });
};