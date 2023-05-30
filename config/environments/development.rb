# frozen_string_literal: true

Rails.application.configure do
    # configurações especificadas aqui deverão precender por cima de config/application.rb

    # no ambiente de desenvolvimento, o código da aplicação é recarregado em
    # cada request. isso desacelera o tempo de response porém é perfeito para
    # desenvolvimento visto que não precisa reiniciar o servidor web ao fazer mudanças.
    config.cache_classes = Gitlab::Utils.to_boolean(ENV['CACHE_CLASSES'], default: false)

    # mostrar reports de erro completo e desabilitar caching dos reports
    config.active_record.verbose_query_logs = true
    config.consider_all_requests_local      = true

    if Rails.root.join('tmp', 'caching-dev.txt').exist?
        config.action_controller.perform_caching = true
        config.action_controller.enable_fragment_cache_logging = true
    else
        config.action_controller.perform_caching = false
    end

    # mostrar aviso quando um dado largo é carregado na memória
    config.active_record.warn_on_records_fetched_greater_than = 1000

    # implementar um erro na página de carregamento se tiver migrações pendentes
    config.active_record.migration_error = :page_load

    # usar apenas builts best-standards-support em navegadores
    config.action_dispatch.best_standards_support = :builtin

    # não compressar os assets
    config.assets.compress = false

    # expandir linhas que carregar os assets
    # config.assets.debug = true

    # anotar view renderizada com templates em arquivos html
    config.action_view.annotate_rendered_view_with_filenames = true

    # previews viewcomponent e lookbook
    config.view_component.default_preview_layout = "component_preview"
    config.view_component.preview_route = "/-/view_component/previews"
    config.lookbook.preview_paths = ["#{config.root}/spec/components/previews"]

    # puxar path do preview agora para prevenir frozenerror durante inicialização
    config.autoload_paths.push("#{config.root}/spec/components/previews")
    config.lookbook.page_paths = ["#{config.root}/spec/components/docs"]

    config.lookbook.preview_params_options_eval = true

    config.lookbook.preview_display_options = {
        layout: %w[fixed fluid],
        theme: ["light", "dark (alpha)"]
    }

    # adicionar erro adicional ao checar pro assets do runtime
    config.assets.raise_runtime_errors = true

    # abrir emails enviados no navegador
    config.action_mailer.delivery_method = :letter_opener_web

    # logar delivery de erros dos emails
    config.action_mailer.raise_delivery_errors = true

    # bootstrapping em um ambiente de desenvolvimento
    config.action_mailer.perform_deliveries = (ENV['BOOTSTRAP'] != '1')
    config.action_mailer.preview_path = GitlabEdition.path_glob('app/mailers/previews')

    config.eager_load = false

    # não logar requests dos assets
    config.assets.quiet = true

    # usar gema listen para assistir mudanças de arquivos e melhorar a performance
    # https://guides.rubyonrails.org/configuring.html#config-file-watcher
    config.file_watcher = ActiveSupport::EventedFileUpdateChecker

    # live shell de bettererrors (repl) a cada frame de stack
    BetterErrors::Middleware.allow_ip!("127.0.0.1/0")

    # desabilitar repl para questões de segurança
    BetterErrors.binding_of_caller_available = false

    # reajustar algumas configurações relacionadas à performance
    if Gitlab::Utils.to_boolean(ENV['RAILS_PROFILE'].to_s)
        warn "hot-reloading é desativado quando você está rodando com rails_profile ativado"

        config.cache_classes = true
        config.eager_load = true
        config.active_record.migration_error = false
        config.active_record.verbose_query_logs = false
        config.action_view.cache_template_loading = true
        config.action_view.annotate_rendered_view_with_filenames = false
        
        config.middleware.delete BetterErrors::Middleware
    end
end