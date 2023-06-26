# frozen_string_literal: true

module Backup
    class Task
        def initialize(progress)
            @progress = progress
        end

        # task de dump de backup para o `path`
        #
        # @param [String] path destino de backup completamente qualificado
        # @param [String] backup_id identificador único para o backup
        def dump(path, backup_id)
            raise NotImplementedError
        end

        # restaurar task de backup do `path`
        def restore(path)
            raise NotImplementedError
        end

        # string retornada será mostrada para o usuário antes de chamar por #restore
        def pre_restore_warning
        end

        # string retornada será mostrada para o usuário depois de chamar por #restore
        def post_restore_warning
        end

        private

        attr_reader :progress

        def puts_time(msg)
            progress.puts "#{Time.zone.now} -- #{msg}"

            Gitlab::BackupLogger.info(message: "#{Rainbow.uncolor(msg)}")
        end
    end
end
