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
 * @param {VARIANT_SUCCESS|VARIANT_WARNING|VARIANT_DANGER|VARIANT_INFO|VARIANT_TIP} [options.variant] - Which GlAlert variant to use; it defaults to VARIANT_DANGER.
 * @param {object} [options.parent] - Reference to parent element under which alert needs to appear. Defaults to `document`.
 * @param {Function} [options.onDismiss] - Handler to call when this alert is dismissed.
 * @param {string} [options.containerSelector] - Selector for the container of the alert
 * @param {boolean} [options.preservePrevious] - Set to `true` to preserve previous alerts. Defaults to `false`.
 * @param {object} [options.primaryButton] - objeto que descreve o botão primário de alerta
 * @param {string} [options.primaryButton.link] - href do botão primário
 * @param {string} [options.primaryButton.text] - texto do botão primário
 * @param {Function} [options.primaryButton.clickHandler] - Handler to call when primary button is clicked on. The click event is sent as an argument.
 * @param {object} [options.secondaryButton] - objeto que descreve o botão secundário de alerta
 * @param {string} [options.secondaryButton.link] - href do botão secundário
 * @param {string} [options.secondaryButton.text] - texto do botão secundário
 * @param {Function} [options.secondaryButton.clickHandler] - Handler to call when secondary button is clicked on. The click event is sent as an argument.
 * @param {boolean} [options.captureError] - Whether to send error to Sentry
 * @param {object} [options.error] - erro a ser capturado no sentry
 */