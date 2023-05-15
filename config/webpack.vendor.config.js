// consts
const path = require('path');
const webpack = require('webpack');

// todo: const vendorDllHash = require('./helpers/vendor_dll_hash');

const ROOT_PATH = path.resolve(__dirname, '..');

// consts de hash de dll
/* const dllHash = vendorDllHash();
const dllCachePath = path.join(ROOT_PATH, `tmp/cache/webpack-dlls/${dllHash}`);
const dllPublicPath = `/assets/webpack/dll.${dllHash}/`; */

module.exports = {
    mode: 'development',

    resolve: {
        extensions: ['.js'],

        alias: {
            jquery$: 'jquery/dist/jquery.slim.js'
        }
    },

    bail: true,

    context: ROOT_PATH,

    entry: {
        vendor: [
            '@apollo/client/core',
            '@gitlab/at.js',
            'core-js',
            'dexie',
            'dompurify',
            'echarts',
            'jed',
            'jquery/dist/jquery.slim.js',
            'katex',
            'lodash',
            'mousetrap',
            'pikaday',
            'popper.js',
            'sortablejs/modular/sortable.esm.js',
            'source-map',
            'three',
            'vue',
            'vuex'
        ]
    },

    output: {
        path: dllCachePath,
        publicPath: dllPublicPath,

        filename: '[name].dll.bundle.js',
        chunkFilename: '[name].dll.chunk.js',
        library: '[name]_[hash]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(dllCachePath, '[name].dll.manifest.json'),
            name: '[name]_[hash]'
        }),

        new YarnCheck({
            rootDirectory: ROOT_PATH,

            exclude: new RegExp(
                [
                    // https://gitlab.com/gitlab-org/gitlab/-/issues/219353
                    'chokidar',

                    // ignorar ts-jest para forçar nova versão
                    'ts-jest'
                ].join('|')
            ),

            forceKill: true
        })
    ],

    node: {
        fs: 'empty', // sqljs necessita de fs

        setImmediate: false
    },

    devtool: 'cheap-module-source-map'
};