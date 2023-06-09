module.exports = {
    client: {
        service: {
            name: 'beglamore',
            localSchemaFile: './tmp/tests/graphql/gitlab_schema.graphql'
        },

        includes: [
            '../{ee/,jh/,}app/assets/javascripts/**/*.{js,graphql}'
        ],

        excludes: [
            '../{ee/,jh/,}spec/{frontend,frontend_integration}/**/*'
        ]
    }
};