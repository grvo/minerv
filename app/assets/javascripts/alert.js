// imports
import * as Sentry from '@sentry/browser';
import Vue from 'vue';

import { GlAlert } from '@gitlab/ui';

// imports locais
import { __ } from '~/locale';

// exports
export const VARIANT_SUCCESS = 'success';
export const VARIANT_WARNING = 'warning';
export const VARIANT_DANGER = 'danger';
export const VARIANT_INFO = 'info';
export const VARIANT_TIP = 'tip';

/**
 * renderizar alerta na parte superior da página ou, opcionalmente, um
 * contêiner existente arbitrário. alerta é sempre descartável
 *
 * @example
 * renderizar novo alerta
 *
 * import { createAlert, VARIANT_WARNING } from '~/alert';
 *
 * createAlert({ message: 'minha mensagem de erro' });
 * createAlert({ message: 'minha mensagem de erro', variant: VARIANT_WARNING });
 *
 * @example
 * ignorar alerta programaticamente
 *
 * const alert = createAlert({ message: 'mensagem' });
 *
 * ...
 *
 * alert.dismiss();
 *
 * @example
 * responder ao alerta sendo descartado
 *
 * createAlert({ message: 'mensagem', onDismiss: () => {} });
 *
 * @param {object} options - opções para controlar a mensagem flash
 * @param {string} options.message - texto de mensagem de alerta
 * @param {string} [options.title] - título de alerta
 * @param {VARIANT_SUCCESS|VARIANT_WARNING|VARIANT_DANGER|VARIANT_INFO|VARIANT_TIP} [options.variant] - qual variante do glalert usar; o padrão é variant_danger
 * @param {object} [options.parent] - referência ao elemento pai sob o qual o alerta precisa aparecer. o padrão é `document`
 * @param {Function} [options.onDismiss] - manipulador para chamar quando este alerta for dispensado
 * @param {string} [options.containerSelector] - seletor para o container do alerta
 * @param {boolean} [options.preservePrevious] - defina como `true` para preservar os alertas anteriores. o padrão é `false`
 * @param {object} [options.primaryButton] - objeto que descreve o botão primário de alerta
 * @param {string} [options.primaryButton.link] - href do botão primário
 * @param {string} [options.primaryButton.text] - texto do botão primário
 * @param {Function} [options.primaryButton.clickHandler] - manipulador para chamar quando o botão principal é clicado. o evento click é enviado como um argumento
 * @param {object} [options.secondaryButton] - objeto que descreve o botão secundário de alerta
 * @param {string} [options.secondaryButton.link] - href do botão secundário
 * @param {string} [options.secondaryButton.text] - texto do botão secundário
 * @param {Function} [options.secondaryButton.clickHandler] - manipulador para chamar quando o botão secundário é clicado. o evento click é enviado como um argumento
 * @param {boolean} [options.captureError] - se deve enviar o erro para o sentry
 * @param {object} [options.error] - erro a ser capturado no sentry
 */
export const createAlert = ({
    message,
    title,
    variant = VARIANT_DANGER,
    parent = document,
    containerSelector = '.flash-container',
    preservePrevious = false,
    primaryButton = null,
    secondaryButton = null,
    onDismiss = null,
    captureError = false,
    error = null
}) => {
    if (captureError && error)
        Sentry.captureException(error);

    const alertContainer = parent.querySelector(containerSelector);

    if (!alertContainer)
        return null;

    const el = document.createElement('div');

    if (preservePrevious) {
        alertContainer.appendChild(el);
    } else {
        alertContainer.replaceChildren(el);
    }

    return new Vue({
        el,

        components: {
            GlAlert
        },

        methods: {
            /**
             * método público para ignorar alerta e remover instance do vue
             */
            dismiss() {
                if (onDismiss) {
                    onDismiss();
                }

                this.$destroy();
                this.$el.parentNode?.removeChild(this.$el);
            }
        },

        render(h) {
            const on = {};

            on.dismiss = () => {
                this.dismiss();
            };

            if (primaryButton?.clickHandler) {
                on.primaryButton = (e) => {
                    primaryButton.clickHandler(e);
                };
            }

            if (secondaryButton?.clickHandler) {
                on.secondaryAction = (e) => {
                    secondaryButton.clickHandler(e);
                };
            }

            return h(
                GlAlert, {
                    props: {
                        title,

                        dismissible: true,
                        dismissLabel: __('ignorar'),

                        variant,

                        primaryButtonLink: primaryButton?.link,
                        primaryButtonText: primaryButton?.text,

                        secondaryButtonLink: secondaryButton?.link,
                        secondaryButtonText: secondaryButton?.text
                    },

                    attrs: {
                        'data-testid': `alert-${variant}`
                    },

                    on
                },

                message
            );
        }
    });
};