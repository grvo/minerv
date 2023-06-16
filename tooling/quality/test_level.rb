# frozen_string_literal: true

module Quality
    class TestLevel
        UnknownTestLevelError = Class.new(StandardError)

        TEST_LEVEL_FOLDERS = {
            migration: %w[
                migrations
            ],

            background_migration: %w[
                lib/gitlab/background_migration
                lib/ee/gitlab/background_migration
            ],

            frontend_fixture: %w[
                frontend/fixtures
            ],

            unit: %w[
                bin
                channels
                components
                config
                contracts
                db
                dependencies
                elastic
                elastic_integration
                experiments
                factories
                finders
                frontend
                graphql
                haml_lint
                helpers
                initializers
                lib
                metrics_server
                models
                policies
                presenters
                rack_servers
                replicators
                routing
                rubocop
                scripts
                serializers
                services
                sidekiq
                sidekiq_cluster
                spam
                support_specs
                tasks
                uploaders
                validators
                views
                workers
                tooling
            ],

            integration: %w[
                commands
                controllers
                mailers
                requests
            ],

            system: [
                'features'
            ]
        }.freeze

        attr_reader :prefixes

        def initialize(prefixes = nil)
            @prefixes = Array(prefixes)

            @patterns = {}
            @regexps = {}
        end

        def pattern(level)
            @patterns[level] ||= "#{prefixes_for_pattern}spec/#{folders_pattern(level)}{,/**/}*#{suffix(level)}".freeze # rubocop:disable style/redundantfreeze
        end

        def regexp(level, start_with = false)
            @regexps[level] ||= Regexp.new("#{'^' if start_with}#{prefixes_for_regex}spec/#{folders_regex(level)}").freeze
        end

        def level_for(file_path)
            case file_path

            # detectar migração de background primeiramente
            # 
            # spec/lib/gitlab/background_migration e testes a partir
            # de spec/lib seja unit por padrão
            when regexp(:background_migration)
                :background_migration
            when regexp(:migration)
                :migration

            # detectar fixture frontend antes de coincidir com outros testes unit
            when regexp(:frontend_fixture)
                :frontend_fixture
            when regexp(:unit)
                :unit
            when regexp(:integration)
                :integration
            when regexp(:system)
                :system
            else
                raise UnknownTestLevelError, "level de teste para #{file_path} não pôde ser setado. por favor, renomeie o arquivo corretamente ou altere os regexes de detecção de nível de teste em #{__FILE__}."
            end
        end

        private

        def prefixes_for_pattern
            return '' if prefixes.empty?

            "{#{prefixes.join(',')}}"
        end

        def prefixes_for_regex
            return '' if prefixes.empty?

            regex_prefix = prefixes.map { |prefix| Regexp.escape(prefix) }.join('|')

            "(#{regex_prefix})"
        end

        def suffix(level)
            case level

            when :frontend_fixture
                ".rb"
            else
                "_spec.rb"
            end
        end

        def folders_pattern(level)
            case level
            
            when :all
                '**'
            else
                "{#{TEST_LEVEL_FOLDERS.fetch(level).join(',')}}"
            end
        end
      
        def folders_regex(level)
            case level

            when :all
                ''
            else
                "(#{TEST_LEVEL_FOLDERS.fetch(level).join('|')})/"
            end
        end
    end
end
