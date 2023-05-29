// modo zen (tela cheia) textarea
//
/*= fornece zen_mode:enter */
/*= fornece zen_mode:leave */

// imports
import autosize from 'autosize';
import Dropzone from 'dropzone';
import $ from 'jquery';
import 'mousetrap/plugins/pause/mousetrap-pause';

import { Mousetrap } from '~/lib/mousetrap';
import { scrollToElement } from '~/lib/utils/common_utils';

Dropzone.autoDiscover = false;

//
// ### eventos
//
// `zen_mode:enter`
//
// disparado quando o "editar em fullscreen" é clicado
//
// **Synchronicity** Sync
// **Bubbles** Yes
// **Cancelable** No
// **Target** a.js-zen-enter
//
// `zen_mode:leave`
//
// disparado quando o "sair de fullscreen" é clicado
//
// **Synchronicity** Sync
// **Bubbles** Yes
// **Cancelable** No
// **Target** a.js-zen-leave
//

export default class ZenMode {
    constructor() {
        this.active_backdrop = null;
        this.active_textarea = null;

        this.storedStyle = null;

        $(document).on('click', '.js-zen-enter', (e) => {
            e.preventDefault();

            return $(e.currentTarget).trigger('zen_mode:enter');
        });

        $(document).on('click', '.js-zen-leave', (e) => {
            e.preventDefault();

            return $(e.currentTarget).trigger('zen_mode:leave');
        });

        (document).on('zen_mode:enter', (e) => {
            this.enter($(e.target).closest('.md-area').find('.zen-backdrop'));
        });

        $(document).on('zen_mode:leave', () => {
            this.exit();
        });

        // eslint-disable-next-line consistent-return
        $(document).on('keydown', (e) => {
            // esc
            if (e.keyCode === 27) {
                e.preventDefault();

                return $(document).trigger('zen_mode:leave');
            }
        });
    }

    enter(backdrop) {
        Mousetrap.pause();

        this.active_backdrop = $(backdrop);
        this.active_backdrop.addClass('fullscreen');
        this.active_textarea = this.active_backdrop.find('textarea');

        // prevenir um resize de usuário de persistir em tela cheia
        this.storedStyle = this.active_textarea.attr('style');
        this.active_textarea.removeAttr('style');
        this.active_textarea.focus();
    }

    exit() {
        if (this.active_textarea) {
            Mousetrap.unpause();

            this.active_textarea.closest('.zen-backdrop').removeClass('fullscreen');
            scrollToElement(this.active_textarea, { duration: 0, offset: -100 });
            this.active_textarea.attr('style', this.storedStyle);

            autosize(this.active_textarea);
            autosize.update(this.active_textarea);

            this.active_textarea = null;
            this.active_backdrop = null;

            const $dropzone = $('.div-dropzone');
            
            if ($dropzone && !$dropzone.hasClass('js-invalid-dropzone')) {
                Dropzone.forElement('.div-dropzone').enable();
            }
        }
    }
}