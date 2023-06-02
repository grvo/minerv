// todo: com o sinalizador de recurso combined_menu removido, provavelmente há uma melhor
// maneira de dividir a importação assíncrona (ou seja, incluir o gatilho no pacote principal, mas
// subvisualizações de importação assíncrona. não faça isso à custa de UX).
//
// veja https://gitlab.com/gitlab-org/gitlab/-/issues/336042

// consts
const importModule = () => import(/* webpackChunkName: 'top_nav' */ './mount');

const tryMountTopNav = async () => {
    const el = document.getElementById('js-top-nav');

    if (!el) {
        return;
    }

    const { mountTopNav } = await importModule();

    mountTopNav(el);
};

const tryMountTopNavResponsive = async () => {
    const el = document.getElementById('js-top-nav-responsive');

    if (!el) {
        return;
    }

    const { mountTopNavResponsive } = await importModule();

    mountTopNavResponsive(el);
};

export const initTopNav = async () => Promise.all([
    tryMountTopNav(),
    tryMountTopNavResponsive()
]);