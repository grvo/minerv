// imports de dependências
import Vue from 'vue';
import Vuex from 'vuex';

// imports locais
import ResponsiveApp from './components/responsive_app.vue';
import App from './components/top_nav_app.vue';

import { createStore } from './stores';

Vue.use(Vuex);

// consts
const mount = (el, Component) => {
    // consts
    const viewModel = JSON.parse(el.dataset.viewModel);
    const store = createStore();

    return new Vue({
        el,

        name: 'TopNavRoot',

        store,

        render(h) {
            return h(Component, {
                props: {
                    navData: viewModel
                }
            });
        }
    });
};

// exports
export const mountTopNav = (el) => mount(el, App);
export const mountTopNavResponsive = (el) => mount(el, ResponsiveApp);