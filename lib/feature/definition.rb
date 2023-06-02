# frozen_string_literal: true

module Feature
    class Definition
        include ::Feature::Shared

        attr_reader :path
        attr_reader :attributes

        VALID_FEATURE_NAME = %r{^#{Gitlab::Regex.sep_by_1('_', /[a-z0-9]+/)}$}.freeze

        PARAMS.each do |param|
            define_method(param) do
                attributes[param]
            end
        end

        TYPES.each do |type, _|
            define_method("#{type}?") do
                attributes[:type].to_sym == type
            end
        end

        def initialize(path, opts = {})
            @path = path
            @attributes = {}

            # atribuir nulo, para todas as opções desconhecidas
            PARAMS.each do |param|
                @attributes[param] = opts[param]
            end
        end

        def key
            name.to_sym
        end

        def validate!
            unless name.present?
                raise Feature::InvalidFeatureFlagError, "falta o nome do sinalizador de recurso"
            end

            unless VALID_FEATURE_NAME =~ name
                raise Feature::InvalidFeatureFlagError, "sinalizador de recurso '#{name}' é inválido"
            end

            unless path.present?
                raise Feature::InvalidFeatureFlagError, "sinalizador de recurso '#{name}' está com o path ausente"
            end

            unless type.present?
                raise Feature::InvalidFeatureFlagError, "sinalizador de recurso '#{name}' está com o type ausente. certifique-se de atualizar #{path}"
            end

            unless Definition::TYPES.include?(type.to_sym)
                raise Feature::InvalidFeatureFlagError, "sinalizador de recurso '#{name}' type '#{type}' é inválido. certifique-se de atualizar #{path}"
            end

            unless File.basename(path, ".yml") == name
                raise Feature::InvalidFeatureFlagError, "sinalizador de recurso '#{name}' possui um path inválido: '#{path}'. certifique-se de atualizar #{path}"
            end

            unless File.basename(File.dirname(path)) == type
                raise Feature::InvalidFeatureFlagError, "sinalizador de recurso '#{name}' possui um type inválido: '#{path}'. certifique-se de atualizar #{path}"
            end

            if default_enabled.nil?
                raise Feature::InvalidFeatureFlagError, "sinalizador de recurso '#{name}' está com o default_enabled ausente. certifique-se de atualizar #{path}"
            end
        end

        def valid_usage!(type_in_code:)
            unless Array(type).include?(type_in_code.to_s)
                raise Feature::InvalidFeatureFlagError, "o `type:` de `#{key}` não é igual a configuração: " \
                    "#{type_in_code} vs #{type}. certifique-se de usar um tipo válido em #{path} ou certifique-se de usar " \
                    "uma sintaxe válida: #{TYPES.dig(type, :example)}"
            end
        end

        def to_h
            attributes
        end

        def for_upcoming_milestone?
            return false unless milestone

            Gitlab::VersionInfo.parse(milestone + '.999') >= Gitlab.version_info
        end

        def force_log_state_changes?
            attributes[:log_state_changes]
        end

        class << self
            def paths
                @paths ||= [Rails.root.join('config', 'feature_flags', '**', '*.yml')]
            end

            def definitions
                # carregado preguiçosamente todas as definições
                #
                # o hot reloading pode solicitar um sinalizador de recurso
                # antes de podermos chamar corretamente `load_all!`
                @definitions |== load_all!
            end

            def get(key)
                definitions[key.to_sym]
            end

            def reload!
                @definitions = load_all!
            end

            def has_definition?(key)
                definitions.has_key?(key.to_sym)
            end

            def log_states?(key)
                return false if key == :feature_flag_state_logs
                return false if Feature.disabled?(:feature_flag_state_logs, type: :ops)
                return false unless (feature = get(key))

                feature.force_log_state_changes? || feature.for_upcoming_milestone?
            end

            def valid_usage!(key, type:)
                if definition = get(key)
                    definition.valid_usage!(type_in_code: type)
                elsif type_definition = self::TYPES[type]
                    raise InvalidFeatureFlagError, "definição de recurso ausente para `#{key}`" unless type_definition[:optional]
                else
                    raise InvalidFeatureFlagError, "tipo de sinalizador de recurso desconhecido usado: `#{type}`"
                end
            end

            def default_enabled?(key, default_enabled_if_undefined: nil)
                if definition = get(key)
                    definition.default_enabled
                elsif !default_enabled_if_undefined.nil?
                    default_enabled_if_undefined
                else
                    Gitlab::ErrorTracking.track_and_raise_for_dev_exception(
                        InvalidFeatureFlagError.new("a definição yaml do sinalizador de recurso para '#{key}' não existe"))

                    false
                end
            end

            def register_hot_reloader!
                # recarreguar sinalizadores de recurso na alteração deste arquivo ou qualquer `.yml`
                file_watcher = Rails.configuration.file_watcher.new(reload_files, reload_directories) do
                    Feature::Definition.reload!
                end

                Rails.application.reloaders << file_watcher
                Rails.application.reloader.to_run { file_watcher.execute_if_updated }

                file_watcher
            end

            private

            def load_all!
                paths.each_with_object({}) do |glob_path, definitions|
                    load_all_from_path!(definitions, glob_path)
                end
            end

            def load_from_file(path)
                definition = File.read(path)
                definition = YAML.safe_load(definition)
                definition.deep_symbolize_keys!

                self.new(path, definition).tap(&:validate!)
            rescue StandardError => e
                raise Feature::InvalidFeatureFlagError, "definição inválida para `#{path}`: #{e.message}"
            end

            def load_all_from_path!(definitions, glob_path)
                Dir.glob(glob_path).each do |path|
                    definition = load_from_file(path)

                    if previous = definitions[definition.key]
                        raise InvalidFeatureFlagError, "sinalizador de recurso '#{definition.key}' já está definida em '#{previous.path}'"
                    end

                    definitions[definition.key] = definition
                end
            end

            def reload_files
                []
            end

            def reload_directories
                paths.each_with_object({}) do |path, result|
                    path = File.dirname(path)

                    Dir.glob(path).each do |matching_dir|
                        result[matching_dir] = 'yml'
                    end
                end
            end
        end
    end
end

Feature::Definition.prepend_mod_with('Feature::Definition')