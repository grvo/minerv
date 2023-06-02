// imports de dependências
import Vue from 'vue';

// imports locais
import LinksToSpamInput from './components/links_to_spam_input.vue';

// exports
export const initLinkToSpam = () => {
    const el = document.getElementById('js-links-to-spam');

    if (!el)
        return false;

    const { links } = el.dataset;

    return new Vue({
        el,

        name: 'LinksToSpamRoot',

        render(createElement) {
            return createElement(LinksToSpamInput, {
                props: {
                    previousLink: JSON.parse(links)
                }
            });
        }
    });
};