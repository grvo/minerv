// consts locais
const IS_EE = require('./config/helpers/is_ee_env');
const isESLint = require('./config/helpers/is_eslint');
const IS_JH = require('./config/helpers/is_jh_env');

const {
    VUE_VERSION: EXPLICIT_VUE_VERSION
} = process.env;

// apenas v2 e v3 são suportados (vue)
if (![undefined, '2', '3'].includes(EXPLICIT_VUE_VERSION)) {
    throw new Error(
        `valor vue_version inválido: ${EXPLICIT_VUE_VERSION}. apenas '2' e '3' são suportados.`
    );
}

// vue versão 3 (v3)
const USE_VUE_3 = EXPLICIT_VUE_VERSION === '3';

// host de teste
const {
    TEST_HOST
} = require('./spec/frontend/__helpers__/test_constants');

module.exports = (path, options = {}) => {
    const {
        moduleNameMapper: extModuleNameMapper = {},
        moduleNameMapperEE: extModuleNameMapperEE = {},
        moduleNameMapperJH: extModuleNameMapperJH = {}
    } = options;

    const reporters = ['default'];
    const VUE_JEST_TRANSFORMER = USE_VUE_3 ? '@vue/vue3-jest' : '@vue/vue2-jest';
    const setupFilesAfterEnv = [`<rootDir>/${path}/test_setup.js`, 'jest-canvas-mock'];
    const vueModuleNameMappers = {};
    const globals = {};

    if (EXPLICIT_VUE_VERSION) {
        Object.assign(vueModuleNameMappers, {
            '^@gitlab/ui/dist/([^.]*)$': [
                '<rootDir>/node_modules/@gitlab/ui/src/$1.vue',
                '<rootDir>/node_modules/@gitlab/ui/src/$1.js'
            ],

            '^@gitlab/ui$': '<rootDir>/node_modules/@gitlab/ui/src/index.js'
        });
    }

    if (USE_VUE_3) {
        setupFilesAfterEnv.unshift(`<rootDir>/${path}/vue_compat_test_setup.js`);

        Object.assign(vueModuleNameMappers, {
            '^vue$': '@vue/compat',
            '^@vue/test-utils$': '@vue/test-utils-vue3',

            // wrappers de bibliotecas
            '^vuex$': '<rootDir>/app/assets/javascripts/lib/utils/vue3compat/vuex.js',
            '^vue-apollo$': '<rootDir>/app/assets/javascripts/lib/utils/vue3compat/vue_apollo.js',
            '^vue-router$': '<rootDir>/app/assets/javascripts/lib/utils/vue3compat/vue_router.js'
        });

        Object.assign(globals, {
            'vue-jest': {
                experimentalCSSCompile: false,

                compiler: require.resolve('./config/vue3migration/compiler'),

                compilerOptions: {
                    whitespace: 'preserve',

                    compatConfig: {
                        MODE: 2
                    }
                }
            }
        });
    }

    // para ter uma análise consistente de data e hora em ambientes locais e de ci, definimos o fuso horário do processo Node
    // https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/27738
    process.env.TZ = 'GMT';

    if (process.env.CI) {
        reporters.push([
            'jest-junit', {
                outputName: './junit_jest.xml',
                addFileAttribute: 'true'
            }
        ]);
    }

    const glob = `${path}/**/*@([._])spec.js`;

    let testMatch = [`<rootDir>/${glob}`];

    if (IS_EE) {
        testMatch.push(`<rootDir>/ee/${glob}`);
    }

    if (IS_JH) {
        testMatch.push(`<rootDir>/jh/${glob}`);
    }

    // https://github.com/JoinColony/eslint-import-resolver-jest#note
    if (isESLint(module)) {
        testMatch = testMatch.map((modulePath) => modulePath.replace('_spec.js', ''));
    }

    const TEST_FIXTURES_PATTERN = 'test_fixtures(/.*)$';
    const TEST_FIXTURES_HOME = '/tmp/tests/frontend/fixtures';
    const TEST_FIXTURES_HOME_EE = '/tmp/tests/frontend/fixtures-ee';
    const TEST_FIXTURES_STATIC_HOME = '/spec/frontend/fixtures/static';
    const TEST_FIXTURES_RAW_LOADER_PATTERN = `(${TEST_FIXTURES_HOME}|${TEST_FIXTURES_STATIC_HOME}).*\\.html$`;

    const moduleNameMapper = {
        [TEST_FIXTURES_PATTERN]: `<rootDir>${TEST_FIXTURES_HOME}$1`,
        '^test_fixtures_static(/.*)$': `<rootDir>${TEST_FIXTURES_STATIC_HOME}$1`,
        '\\.(svg|gif|png|mp4)(\\?\\w+)?$': '<rootDir>/spec/frontend/__mocks__/file_mock.js',
        '\\.css$': '<rootDir>/spec/frontend/__mocks__/file_mock.js',
        '^~(/.*)\\?(worker|raw)$': '<rootDir>/app/assets/javascripts$1',
        '^(.*)\\?(worker|raw)$': '$1',
        '^~(/.*)$': '<rootDir>/app/assets/javascripts$1',
        '^ee_component(/.*)$':
        '<rootDir>/app/assets/javascripts/vue_shared/components/empty_component.js',
        '^jh_component(/.*)$':
        '<rootDir>/app/assets/javascripts/vue_shared/components/empty_component.js',
        '^shared_queries(/.*)$': '<rootDir>/app/graphql/queries$1',
        '^ee_else_ce(/.*)$': '<rootDir>/app/assets/javascripts$1',
        '^jh_else_ce(/.*)$': '<rootDir>/app/assets/javascripts$1',
        '^any_else_ce(/.*)$': '<rootDir>/app/assets/javascripts$1',
        '^helpers(/.*)$': '<rootDir>/spec/frontend/__helpers__$1',
        '^vendor(/.*)$': '<rootDir>/vendor/assets/javascripts$1',
        '^public(/.*)$': '<rootDir>/public$1',
        'emojis(/.*).json': '<rootDir>/fixtures/emojis$1.json',
        '^spec/test_constants$': '<rootDir>/spec/frontend/__helpers__/test_constants',
        '^jest/(.*)$': '<rootDir>/spec/frontend/$1',
        '^ee_else_ce_jest/(.*)$': '<rootDir>/spec/frontend/$1',
        '^jquery$': '<rootDir>/node_modules/jquery/dist/jquery.slim.js',
        '^@sentry/browser$': '<rootDir>/app/assets/javascripts/sentry/sentry_browser_wrapper.js',
        '^dexie$': '<rootDir>/node_modules/dexie/dist/dexie.min.js',

        ...extModuleNameMapper,
        ...vueModuleNameMappers
    };

    const collectCoverageFrom = ['<rootDir>/app/assets/javascripts/**/*.{js,vue}'];

    if (IS_EE) {
        const rootDirEE = '<rootDir>/ee/app/assets/javascripts$1';
        const specDirEE = '<rootDir>/ee/spec/frontend/$1';

        Object.assign(moduleNameMapper, {
            '^ee(/.*)$': rootDirEE,
            '^ee_component(/.*)$': rootDirEE,
            '^ee_else_ce(/.*)$': rootDirEE,
            '^ee_jest/(.*)$': specDirEE,
            '^ee_else_ce_jest/(.*)$': specDirEE,
            '^any_else_ce(/.*)$': rootDirEE,
            '^jh_else_ee(/.*)$': rootDirEE,

            [TEST_FIXTURES_PATTERN]: `<rootDir>${TEST_FIXTURES_HOME_EE}$1`,

            ...extModuleNameMapperEE
        });

        collectCoverageFrom.push(rootDirEE.replace('$1', '/**/*.{js,vue}'));
    }

    if (IS_JH) {
        // não adicionar caminho adicional ao lado de jihu, pode quebrar as coisas
        const rootDirJH = '<rootDir>/jh/app/assets/javascripts$1';
        const specDirJH = '<rootDir>/jh/spec/frontend/$1';

        Object.assign(moduleNameMapper, {
            '^jh(/.*)$': rootDirJH,
            '^jh_component(/.*)$': rootDirJH,
            '^jh_jest/(.*)$': specDirJH,

            // jh path alias https://gitlab.com/gitlab-org/gitlab/-/merge_requests/74305#note_732793956

            '^jh_else_ce(/.*)$': rootDirJH,
            '^jh_else_ee(/.*)$': rootDirJH,
            '^any_else_ce(/.*)$': rootDirJH,

            ...extModuleNameMapperJH
        });

        collectCoverageFrom.push(rootDirJH.replace('$1', '/**/*.{js,vue}'));
    }

    const coverageDirectory = () => {
        if (process.env.CI_NODE_INDEX && process.env.CI_NODE_TOTAL) {
            return `<rootDir>/coverage-frontend/jest-${process.env.CI_NODE_INDEX}-${process.env.CI_NODE_TOTAL}`;
        }

        return '<rootDir>/coverage-frontend/';
    };

    const gfmParserDependencies = [
        'rehype-.*',
        'remark-.*',
        'hast*',
        'unist.*',
        'markdown-table',
        'mdast-util-.*',
        'micromark.*',
        'vfile.*',
        'bail',
        'trough',
        'unified',
        'is-plain-obj',
        'decode-named-character-reference',
        'character-entities*',
        'property-information',
        'space-separated-tokens',
        'comma-separated-tokens',
        'web-namespaces',
        'zwitch',
        'html-void-elements',
        'ccount',
        'escape-string-regexp'
    ];

    const transformIgnoreNodeModules = [
        'vue-test-utils-compat',
        '@gitlab/ui',
        '@gitlab/favicon-overlay',
        '@gitlab/cluster-client',
        'bootstrap-vue',
        'three',
        'monaco-editor',
        'monaco-yaml',
        'monaco-marker-data-provider',
        'monaco-worker-manager',
        'fast-mersenne-twister',
        'prosemirror-markdown',
        'marked',
        'fault',
        'dateformat',
        'lowlight',
        'vscode-languageserver-types',
        'yaml',
        'dexie',

        ...gfmParserDependencies
    ];

    return {
        globals,
        clearMocks: true,
        testMatch,

        moduleFileExtensions: [
            'js',
            'json',
            'vue',
            'gql',
            'graphql',
            'yaml',
            'yml',
            'html'
        ],

        moduleNameMapper,
        collectCoverageFrom,

        coverageDirectory: coverageDirectory(),

        coverageReporters: [
            'json',
            'lcov',
            'text-summary',
            'clover'
        ],

        // precisamos ignorar a cobertura do código _worker, pois estamos transformando-o manualmente
        coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '_worker\\.js$'],
        cacheDirectory: '<rootDir>/tmp/cache/jest',
        modulePathIgnorePatterns: ['<rootDir>/.yarn-cache/'],

        reporters,
        resolver: './jest_resolver.js',
        setupFilesAfterEnv,
        restoreMocks: true,
        slowTestThreshold: process.env.CI ? 6000 : 500,

        transform: {
            '^.+\\.(gql|graphql)$': './spec/frontend/__helpers__/graphql_transformer.js',
            '^.+_worker\\.js$': './spec/frontend/__helpers__/web_worker_transformer.js',
            '^.+\\.js$': 'babel-jest',

            '^.+\\.vue$': VUE_JEST_TRANSFORMER,

            'spec/frontend/editor/schema/ci/yaml_tests/.+\\.(yml|yaml)$':
                './spec/frontend/__helpers__/yaml_transformer.js',
            '^.+\\.(md|zip|png|yml|yaml|sh|ps1)$': './spec/frontend/__helpers__/raw_transformer.js',

            [TEST_FIXTURES_RAW_LOADER_PATTERN]: './spec/frontend/__helpers__/raw_transformer.js'
        },

        transformIgnorePatterns: [`node_modules/(?!(${transformIgnoreNodeModules.join('|')}))`],

        fakeTimers: {
            enableGlobally: true,

            doNotFake: [
                'nextTick',
                'setImmediate'
            ],

            legacyFakeTimers: true
        },

        testEnvironment: '<rootDir>/spec/frontend/environment.js',

        testEnvironmentOptions: {
            IS_EE,
            IS_JH,

            url: TEST_HOST
        },

        testRunner: 'jest-jasmine2'
    };
};
