/* eslint-disable import/no-commonjs, max-classes-per-file */

// consts de dependências
const { TestEnvironment } = require('jest-environment-jsdom');
const { ErrorWithStack } = require('jest-util');

// consts locais de __helpers__
const { TEST_HOST } = require('./__helpers__/test_constants');
const { createGon } = require('./__helpers__/gon_helper');

const {
    setGlobalDateToFakeDate,
    setGlobalDateToRealDate
} = require('./__helpers__/fake_date/fake_date');

class CustomEnvironment extends TestEnvironment {
    constructor({
        globalConfig,
        projectConfig
    }, context) {
        // configura o testurl para que window.location seja configurado corretamente
        super({
            globalConfig,

            projectConfig: {
                ...projectConfig,

                testURL: TEST_HOST
            }
        }, context);

        // falsificar `date` para `jsdom` que corrige coisas como document.cookie
        // https://gitlab.com/gitlab-org/gitlab/-/merge_requests/39496#note_503084332
        setGlobalDateToFakeDate();

        const {
            error: originalErrorFn
        } = context.console;

        Object.assign(context.console, {
            error(...args) {
                if (
                    args?.[0]?.includes('[aviso vue]: faltando propriedade necessária') ||
                    args?.[0]?.includes('[aviso vue]: propriedade inválida')
                ) {
                    originalErrorFn.apply(context.console, args);

                    return;
                }

                throw new ErrorWithStack(
                    `chamada inesperada do console.error() com:\n\n${args.join(', ')}`,

                    this.error
                );
            },

            warn(...args) {
                if (args?.[0]?.includes('o callback updatequery para o fetchmore é descontinuado')) {
                    return;
                }

                throw new ErrorWithStack(
                    `chamada inesperada do console.warn() com:\n\n${args.join(', ')}`,

                    this.warn
                );
            }
        });

        const { IS_EE } = projectConfig.testEnvironmentOptions;

        this.global.IS_EE = IS_EE;

        // configurar objeto global `gon`
        this.global.gon = createGon(IS_EE);

        // configurar objeto global `gl`
        this.global.gl = {};

        this.rejectedPromises = [];

        this.global.promiseRejectionHandler = (error) => {
            this.rejectedPromises.push(error);
        };

        /**
         * window.fetch() é necessário pela biblioteca apollo-upload-client
         *
         * https://github.com/jaydenseric/apollo-upload-client/issues/100
         */
        this.global.fetch = () => {};

        // expor jsdom (criado em super class) para o global
        this.global.jsdom = this.dom;

        //
        // variáveis de ambiente relacionadas ao monaco
        //
        Object.defineProperty(this.global, 'matchMedia', {
            writable: true,

            value: (query) => ({
                matches: false,
                media: query,
                onchange: null,

                addListener: () => null, // descontinuado
                removeListener: () => null, // descontinuado
                addEventListener: () => null,
                removeEventListener: () => null,
                dispatchEvent: () => null
            })
        });

        class NoopObserver {
            /* eslint-disable no-useless-constructor, no-unused-vars, no-empty-function, class-methods-use-this */
            constructor(callback) {}
            disconnect() {}
            observe(element, initObject) {}
            unobserve(element) {}

            takeRecords() {
                return [];
            }
            /* eslint-enable no-useless-constructor, no-unused-vars, no-empty-function, class-methods-use-this */
        }

        ['IntersectionObserver', 'PerformanceObserver', 'ResizeObserver'].forEach((observer) => {
            if (this.global[observer]) {
                throw new Error(
                    ``
                );
            }

            this.global[observer] = NoopObserver;
        });
    }

    async teardown() {
        // redefinir `data` para que jest possa relatar o tempo com precisão
        setGlobalDateToRealDate();

        // eslint-disable-next-line no-restricted-syntax
        await new Promise(setImmediate);

        if (this.rejectedPromises.length > 0) {
            throw new ErrorWithStack(
                `rejeições promise não tratadas: ${this.rejectedPromises.join(', ')}`,

                this.teardown
            );
        }

        await super.teardown();
    }
}

module.exports = CustomEnvironment;