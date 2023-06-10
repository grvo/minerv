// imports de dependências
import Vue from 'vue';
import Vuex from 'vuex';

// import local
import batchComments from './modules/batch_comments';

Vue.use(Vuex);

export const createStore = () => new Vuex.Store({
    modules: {
        batchComments: batchComments()
    }
});

export default createStore();