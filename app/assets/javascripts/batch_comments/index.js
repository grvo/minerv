// imports de dependências
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import {
    mapActions,
    mapGetters
} from 'vuex';

// imports locais
import store from '~/mr_notes/stores';

import {
    apolloProvider
} from '~/graphql_shared/issuable_client';

export const initReviewBar = ({ editorActions = [] } = {}) => {
    const el = document.getElementById('js-review-bar');

    if (!el)
        return;

    Vue.use(VueApollo);

    // eslint-disable-next-line no-new
    new Vue({
        el,
        store,
        apolloProvider,

        components: {
            ReviewBar: () => import('./components/review_bar.vue')
        },

        provide: {
            newCommentTemplatePath: el.dataset.newCommentTemplatePath,

            editorActions
        },

        computed: {
            ...mapGetters('batchComments', ['draftsCount'])
        },

        mounted() {
            this.fetchDrafts();
        },

        methods: {
            ...mapActions('batchComments', ['fetchDrafts'])
        },

        render(createElement) {
            if (this.draftsCount === 0)
                return null;

            return createElement('review-bar');
        }
    });
};