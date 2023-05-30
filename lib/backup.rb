# frozen_string_literal: true

module Backup
    Error = Class.new(StandardError)

    class FileBackupError < Backup::Error
        attr_reader :app_files_dir, :backup_tarball

        def initialize(app_files_dir, backup_tarball)
            @app_files_dir = app_files_dir
            @backup_tarball = backup_tarball
        end

        def message
            "falha ao criar arquivo comprimido '#{backup_tarball}' enquanto tentava recuperar os seguintes paths: '#{app_files_dir}'"
        end
    end

    class DatabaseBackupError < Backup::Error
        attr_reader :config, :db_file_name

        def initialize(config, db_file_name)
            @config = config
            @db_file_name = db_file_name
        end

        def message
            "falha ao criar arquivo comprimido '#{db_file_name}' enquanto tentava recuperar o banco de dados principal:\n - host: '#{config[:host]}'\n - porto: '#{config[:port]}'\n - banco de dados: '#{config[:database]}'"
        end
    end
end