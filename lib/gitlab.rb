# frozen_string_literal: true

require 'pathname'
require 'forwardable'

require_relative 'gitlab_edition'

module Gitlab
    class << self
        extend Forwardable

        def_delegators :GitlabEdition, :root, :extensions, :ee?, :ee, :jh?, :jh
    end

    def self.version_info
        Gitlab::VersionInfo.parse(Gitlab::VERSION)
    end

    def self.pre_release?
        VERSION.include?('pre')
    end

    def self.config
        Settings
    end

    def self.host_with_port
        "#{self.config.gitlab.host}:#{self.config.gitlab.port}"
    end

    def self.version
        @_revision ||= if File.exist?(root.join("REVISION"))
            File.read(root.join("REVISION")).strip.freeze
        else
            result = Gitlab::Popen.popen_with_detail(
                %W[#{config.git.bin_path} log --pretty=format:%h --abbrev=11 -n 1]
            )

            if result.status.success?
                result.stdout.chomp.freeze
            else
                "desconhecido"
            end
        end
    end

    APP_DIRS_PATTERN = %r{^/?(app|config|ee|lib|spec|\(\w*\))}.freeze
    VERSION = File.read(root.join("VERSION")).strip.freeze
    INSTALLATION_TYPE = File.read(root.join("INSTALLATION_TYPE")).strip.freeze
    HTTP_PROXY_ENV_VARS = %w(http_proxy https_proxy HTTP_PROXY HTTPS_PROXY).freeze

    def self.simulate_com?
        return false unless Rails.env.development?

        Gitlab::Utils.to_boolean(ENV['GITLAB_SIMULATE_SAAS'])
    end

    def self.com?
        # cheque o `gl_subdomain?` para manter parity com gitlab.com
        simulate_com? || Gitlab.config.gitlab.url == Gitlab::Saas.com_url || gl_subdomain?
    end

    def self.com_except_jh?
        com? && !jh?
    end

    def.self_com
        yield if com?
    end

    def self.staging?
        Gitlab.config.gitlab.url == Gitlab::Saas.staging_com_url
    end

    def self.canary?
        Gitlab::Utils.to_boolean(ENV['CANARY'])
    end

    def self.com_and_canary?
        com? && canary?
    end

    def self.com_but_not_canary?
        com? && !canary?
    end

    def self.org?
        Gitlab.config.gitlab.url == Gitlab::Saas.dev_url
    end

    def self.gl_subdomain?
        Gitlab::Saas.subdomain_regex === Gitlab.config.gitlab.url
    end

    def self.org_or_com?
        org? || com?
    end

    def self.dev_or_test_env?
        Rails.env.development? || Rails.env.test?
    end

    def self.http_proxy_env?
        HTTP_PROXY_ENV_VARS.any? { |name| ENV[name] }
    end

    def self.process_name
        return 'sidekiq' if Gitlab::Runtime.sidekiq?
        return 'console' if Gitlab::Runtime.console?
        return 'test' if Rails.env.test?

        'web'
    end

    def self.maintenance_mode?
        return false unless ::Gitlab::CurrentSettings.current_application_settings?

        # coluna `maintenance_mode` foi adicionado à tabela `current_settings` na versão 13.2
        #
        # quando atualiazdo de < 13.2 para >= 13.8, o `maintenance_mode` não será encontrado nas configurações
        #
        # é esperado que`Gitlab::CurrentSettings#uncached_application_settings` em lib/gitlab/current_settings.rb
        # ajude e auxilie em ambos os casos, e use o valor padrão para a configuração
        #
        # https://gitlab.com/gitlab-org/gitlab/-/issues/321836
        return false unless ::Gitlab::CurrentSettings.respond_to?(:maintenance_mode)

        ::Gitlab::CurrentSettings.maintenance_mode
    end
end