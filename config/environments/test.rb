# frozen_string_literal: true

# requires
require 'gitlab/testing/request_blocker_middleware'
require 'gitlab/testing/robots_blocker_middleware'
require 'gitlab/testing/request_inspector_middleware'
require 'gitlab/testing/clear_process_memory_cache_middleware'

require 'gitlab/utils'

Rails.application.configure do
    # certifique-se de que o middleware está inserido primeiro na chain do middleware
    config.middleware.insert_before(ActionDispatch::Static, Gitlab::Testing::RequestBlockerMiddleware)
    config.middleware.insert_before(ActionDispatch::Static, Gitlab::Testing::RobotsBlockerMiddleware)
    config.middleware.insert_before(ActionDispatch::Static, Gitlab::Testing::RequestInspectorMiddleware)
    config.middleware.insert_before(ActionDispatch::Static, Gitlab::Testing::ClearProcessMemoryCacheMiddleware)

    # configurações especificadas aqui deverão precender por cima de config/application.rb

    # o ambiente de teste é usado exclusivamente para rodar seus testes de aplicação
    config.cache_classes = Gitlab::Utils.to_boolean(ENV['CACHE_CLASSES'], default: false)

    config.view_component.preview_route = "/-/view_component/previews"

    # configurar asset de servidor estático para testes com cache-control
    config.assets.compile = false if ENV['CI']

    # debugar erros de assetnotprecompiled localmente, setar CHECK_PRECOMPILED_ASSETS para true
    config.assets.check_precompiled_asset = Gitlab::Utils.to_boolean(ENV['CHECK_PRECOMPILED_ASSETS'], default: false)

    config.public_file_server.enabled = true
    config.public_file_server.headers = { 'Cache-Control' => 'public, max-age=3600' }

    # mostrar reports de erros completos e desabilitar caching
    config.active_record.verbose_query_logs  = true
    config.consider_all_requests_local       = true
    config.action_controller.perform_caching = false

    # mostrar exceções em vez de templates de exceções de renderização
    config.action_dispatch.show_exceptions = false

    # desabilitar proteção de request no ambiente de testes
    config.action_controller.allow_forgery_protection = false

    # dizer ao action mailer para não encarregar emails para o mundo real
    config.action_mailer.delivery_method = :test

    config.action_mailer.preview_path = GitlabEdition.path_glob('app/mailers/previews')

    config.eager_load = Gitlab::Utils.to_boolean(ENV['GITLAB_TEST_EAGER_LOAD'], default: ENV['CI'].present?)

    config.cache_store = :null_store

    config.active_job.queue_adapter = :test

    if ENV['CI'] && !ENV['RAILS_ENABLE_TEST_LOG']
        config.logger = ActiveSupport::TaggedLogging.new(Logger.new(nil))

        config.log_level = :fatal
    end
end