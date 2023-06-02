// imports de dependências
import Vuex from 'vuex';

// imports locais
import {
    createStoreOptions
} from '~/frequent_items/store';

export const createStore = () => new Vuex.Store(createStoreOptions());