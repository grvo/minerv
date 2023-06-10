// import de dependência
import Vue from 'vue';

// import local
import LinksToSpamInput from './components/links_to_spam_input.vue';

// export
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