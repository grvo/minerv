# frozen_string_literal: true

Rails.application.configure do
    # configurações especificadas aqui deverão precender por cima de config/application.rb

    # código não é reiniciado durante os requests
    config.cache_classes = true

    # desativar reports de erro completo e caching dos reports habilitado
    config.consider_all_requests_local       = false
    config.action_controller.perform_caching = true

    # desabilitar asset de servidor estático rail's (apache ou nginx já farão isso)
    config.public_file_server.enabled = false

    # compressar javascript e css
    config.assets.js_compressor = :terser
    # config.assets.css_compressor = :sass

    config.assets.compile = false

    # gerar digests para urls de assets
    config.assets.digest = true

    # habilitar compressão de assets compilados usando gzip
    config.assets.compress = true

    # incluir informação genérica e útil
    config.log_level = :info

    # silenciar mensagens no log de renderização de template
    # http://stackoverflow.com/a/16369363
    %w{render_template render_partial render_collection}.each do |event|
        ActiveSupport::Notifications.unsubscribe "#{event}.action_view"
    end

    # não dumpar schema depois de migrações
    config.active_record.dump_schema_after_migration = false

    config.action_mailer.delivery_method = :sendmail

    # padrões
    #
    # config.action_mailer.sendmail_settings = {
    #     location: '/usr/sbin/sendmail',
    #     arguments: '-i -t'
    # }
    config.action_mailer.perform_deliveries = true
    config.action_mailer.raise_delivery_errors = true

    config.eager_load = true
end