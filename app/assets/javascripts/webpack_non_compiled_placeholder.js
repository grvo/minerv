/* globais de live_reload */
const div = document.createElement('div');

Object.assign(div.style, {
    width: '100vw',
    height: '100vh',

    position: 'fixed',

    top: 0,
    left: 0,

    'z-index': 100000,

    background: 'rgba(0,0,0,0.9)',

    'font-size': '20px',
    'font-family': 'monospace',

    color: 'white',
    padding: '2.5em',

    'text-align': 'center'
});

const reloadMessage = LIVE_RELOAD
    ? 'você ativou o live_reload, a página será recarregada automaticamente quando concluída.'
    : 'você desativou o live_reload, a página será recarregada automaticamente em alguns segundos.';

// eslint-disable-next-line no-unsanitized/property
div.innerHTML = `
<!-- https://github.com/webpack/media/blob/master/logo/icon-square-big.svg -->
<svg height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
    <path fill="#FFF" d="M600 0l530.3 300v600L600 1200 69.7 900V300z"/>
    <path fill="#8ED6FB" class="st1" d="M1035.6 879.3l-418.1 236.5V931.6L878 788.3l157.6 91zm28.6-25.9V358.8l-153 88.3V765l153 88.4zm-901.5 25.9l418.1 236.5V931.6L320.3 788.3l-157.6 91zm-28.6-25.9V358.8l153 88.3V765l-153 88.4zM152 326.8L580.8 84.2v178.1L306.1 413.4l-2.1 1.2-152-87.8zm894.3 0L617.5 84.2v178.1l274.7 151.1 2.1 1.2 152-87.8z"/>
    <path fill="#1C78C0" d="M580.8 889.7l-257-141.3v-280l257 148.4v272.9zm36.7 0l257-141.3v-280l-257 148.4v272.9zm-18.3-283.6zM341.2 436l258-141.9 258 141.9-258 149-258-149z"/>
</svg>

<h1 style="color:white">
    ✨ webpack está compilando assets do frontend ✨
</h1>

<p>
    para reduzir o consumo de memória gdk, a compilação sob demanda incremental está ativada por padrão.<br />
    você pode desativar isso no gdk.yml.

    saiba mais <a href="https://gitlab.com/gitlab-org/gitlab-development-kit/-/blob/main/doc/configuration.md#webpack-settings">
        aqui
    </a>.
</p>

<p>
    ${reloadMessage}<br />

    caso contrário, por favor <a href="">recarregue a página manualmente</a>.
</p>
`;

document.body.append(div);

if (!LIVE_RELOAD) {
    setTimeout(() => {
       window.location.reload();
    }, 5000);
}