# frozen_string_literal: true

source 'https://rubygems.org'

if ENV.fetch('BUNDLER_CHECKSUM_VERIFICATION_OPT_IN', 'false') != 'false' # essa verificação ainda é experimental
    $LOAD_PATH.unshift(File.expand_path("vendor/gems/bundler-checksum/lib", __dir__))

    require 'bundler-checksum'

    BundlerChecksum.patch!
end

gem 'bundler-checksum', '~> 0.1.0',
path: 'vendor/gems/bundler-checksum',
require: false

# ao incrementar a maior ou menor versão aqui, incrementar também activerecord_version
# em vendor/gems/attr_encrypted/attr_encrypted.gemspec até ser resolvido
# https://gitlab.com/gitlab-org/gitlab/-/issues/375713
gem 'rails', '~> 6.1.7.2'
gem 'bootsnap', '~> 1.16.0', require: false
gem 'openssl', '~> 3.0'
gem 'ipaddr', '~> 1.2.5'

# responders respond_to e respond_with
gem 'responders', '~> 3.0'
gem 'sprockets', '~> 3.7.0'
gem 'view_component', '~> 2.82.0'

# banco de dados suportados
gem 'pg', '~> 1.5.3'
gem 'neighbor', '~> 0.2.3'
gem 'rugged', '~> 1.5'
gem 'grape-path-helpers', '~> 1.7.1'
gem 'faraday', '~> 1.0'
gem 'marginalia', '~> 1.11.1'

# autorização
gem 'declarative_policy', '~> 1.1.0'

# bibliotecas de autenticação
gem 'devise', '~> 4.8.1'
gem 'devise-pbkdf2-encryptable', '~> 0.0.0', path: 'vendor/gems/devise-pbkdf2-encryptable'
gem 'bcrypt', '~> 3.1', '>= 3.1.14'
gem 'doorkeeper', '~> 5.6', '>= 5.6.6'
gem 'doorkeeper-openid_connect', '~> 1.8', '>= 1.8.6'
gem 'rexml', '~> 3.2.5'
gem 'ruby-saml', '~> 1.13.0'
gem 'omniauth', '~> 2.1.0'
gem 'omniauth-auth0', '~> 3.1'
gem 'omniauth-azure-activedirectory-v2', '~> 2.0'
gem 'omniauth-azure-oauth2', '~> 0.0.9', path: 'vendor/gems/omniauth-azure-oauth2' # See gem README.md
gem 'omniauth-dingtalk-oauth2', '~> 1.0'
gem 'omniauth-alicloud', '~> 2.0.1'
gem 'omniauth-facebook', '~> 4.0.0'
gem 'omniauth-github', '2.0.1'
gem 'omniauth-gitlab', '~> 4.0.0', path: 'vendor/gems/omniauth-gitlab' # See vendor/gems/omniauth-gitlab/README.md
gem 'omniauth-google-oauth2', '~> 1.1'
gem 'omniauth-oauth2-generic', '~> 0.2.2'
gem 'omniauth-saml', '~> 2.1.0'
gem 'omniauth-twitter', '~> 1.4'
gem 'omniauth_crowd', '~> 2.4.0', path: 'vendor/gems/omniauth_crowd' # See vendor/gems/omniauth_crowd/README.md
gem 'omniauth_openid_connect', '~> 0.6.1'

# trancado até o ruby 3.0 atualizar em uma atualização gem net-smtp
# https://docs.gitlab.com/ee/development/emails.html#rationale
gem 'openid_connect', '= 1.3.0'
gem 'omniauth-salesforce', '~> 1.0.5', path: 'vendor/gems/omniauth-salesforce' # See gem README.md
gem 'omniauth-atlassian-oauth2', '~> 0.2.0'
gem 'rack-oauth2', '~> 1.21.3'
gem 'jwt', '~> 2.5'

# autenticação kerberos -> ee-only
gem 'gssapi', '~> 1.3.1', group: :kerberos
gem 'timfel-krb5-auth', '~> 0.8', group: :kerberos

# proteção de spam e anti-bot
gem 'recaptcha', '~> 5.12', require: 'recaptcha/rails'
gem 'akismet', '~> 3.0'
gem 'invisible_captcha', '~> 2.0.0'

# autenticação de dois-fatores
gem 'devise-two-factor', '~> 4.0.2'
gem 'rqrcode-rails3', '~> 0.1.7'
gem 'attr_encrypted', '~> 3.2.4', path: 'vendor/gems/attr_encrypted'

# gitlab pages
gem 'validates_hostname', '~> 1.0.11'
gem 'rubyzip', '~> 2.3.2', require: 'zip'

# suporte de letsencrypt para gitlab pages
gem 'acme-client', '~> 2.0'

# detecção de navegador
gem 'browser', '~> 5.3.1'

# detecção de sistema operacional para uso de ping
gem 'ohai', '~> 17.9'

# gpg
gem 'gpgme', '~> 2.0.22'

# autenticação ldap
# https://github.com/intridea/omniauth-ldap/compare/master...gitlabhq:master
gem 'gitlab_omniauth-ldap', '~> 2.2.0', require: 'omniauth-ldap'
gem 'net-ldap', '~> 0.17.1'

# api
gem 'grape', '~> 1.5.2'
gem 'grape-entity', '~> 0.10.0'
gem 'rack-cors', '~> 1.1.1', require: 'rack/cors'
gem 'grape-swagger', '~>1.5.0', group: [:development, :test]
gem 'grape-swagger-entity', '~> 0.5.1', group: [:development, :test]

# api de graphql
gem 'graphql', '~> 1.13.12'
gem 'graphiql-rails', '~> 1.8'
gem 'apollo_upload_server', '~> 2.1.0'
gem 'graphql-docs', '~> 2.1.0', group: [:development, :test]
gem 'graphlient', '~> 0.5.0' # usado pela feature bulkimport (group::import)

gem 'hashie', '~> 5.0.0'

# paginação
gem 'kaminari', '~> 1.2.2'

# haml
gem 'hamlit', '~> 2.15.0'

# anexos de arquivos
gem 'carrierwave', '~> 1.3'
gem 'mini_magick', '~> 4.10.1'

# para backups
gem 'fog-aws', '~> 3.18'

# trancado até fog-google resolver https://github.com/fog/fog-google/issues/421
# config/initializers/fog_core_patch.rb
gem 'fog-core', '= 2.1.0'
gem 'fog-google', '~> 1.19', require: 'fog/google'
gem 'fog-local', '~> 0.8'

# https://github.com/aliyun/aliyun-oss-ruby-sdk/pull/93
gem 'fog-aliyun', '~> 0.4'
gem 'gitlab-fog-azure-rm', '~> 1.7.0', require: 'fog/azurerm'

# para armazenamento google
gem 'google-cloud-storage', '~> 1.44.0'
gem 'google-apis-core', '~> 0.10.0'
gem 'google-apis-compute_v1', '~> 0.57.0'
gem 'google-apis-container_v1', '~> 0.43.0'
gem 'google-apis-container_v1beta1', '~> 0.43.0'
gem 'google-apis-cloudbilling_v1', '~> 0.21.0'
gem 'google-apis-cloudresourcemanager_v1', '~> 0.31.0'
gem 'google-apis-iam_v1', '~> 0.36.0'
gem 'google-apis-serviceusage_v1', '~> 0.28.0'
gem 'google-apis-sqladmin_v1beta4', '~> 0.41.0'
gem 'google-apis-androidpublisher_v3', '~> 0.34.0'

# para armazenamento aws
gem 'unf', '~> 0.1.4'

# dados de seed
gem 'seed-fu', '~> 2.3.7'

# pesquisa
gem 'elasticsearch-model', '~> 7.2'
gem 'elasticsearch-rails', '~> 7.2', require: 'elasticsearch/rails/instrumentation'
gem 'elasticsearch-api',   '7.13.3'
gem 'aws-sdk-core', '~> 3.172.0'
gem 'aws-sdk-cloudformation', '~> 1'
gem 'aws-sdk-s3', '~> 1.122.0'
gem 'faraday_middleware-aws-sigv4', '~>0.3.0'
gem 'typhoeus', '~> 1.4.0' # usado com elasticsearch para suporte http

# markdown e processamento html
gem 'html-pipeline', '~> 2.14.3'
gem 'deckar01-task_list', '2.3.2'
gem 'gitlab-markup', '~> 1.9.0', require: 'github/markup'
gem 'commonmarker', '~> 0.23.6'
gem 'kramdown', '~> 2.3.1'
gem 'RedCloth', '~> 4.3.2'
gem 'rdoc', '~> 6.3.2'
gem 'org-ruby', '~> 0.9.12'
gem 'creole', '~> 0.5.0'
gem 'wikicloth', '0.8.1'
gem 'asciidoctor', '~> 2.0.18'
gem 'asciidoctor-include-ext', '~> 0.4.0', require: false
gem 'asciidoctor-plantuml', '~> 0.0.16'
gem 'asciidoctor-kroki', '~> 0.8.0', require: false
gem 'rouge', '~> 4.1.0'
gem 'truncato', '~> 0.7.12'
gem 'nokogiri', '~> 1.14.3'

# renderização de calendário
gem 'icalendar'

# diffs
gem 'diffy', '~> 3.4'
gem 'diff_match_patch', '~> 0.1.0'

# servidor de aplicação
gem 'rack', '~> 2.2.7'

# # https://github.com/zombocom/rack-timeout/blob/master/README.md#rails-apps-manually
gem 'rack-timeout', '~> 0.6.3', require: 'rack/timeout/base'

group :puma do
    gem 'puma', '~> 5.6.5', require: false
    gem 'sd_notify', '~> 0.1.0', require: false
end

# máquina de estado
gem 'state_machines-activerecord', '~> 0.8.0'

# tags de domínio ci
gem 'acts-as-taggable-on', '~> 9.0'

# jobs de background
gem 'sidekiq', '~> 6.5.7'
gem 'sidekiq-cron', '~> 1.8.0'
gem 'redis-namespace', '~> 1.9.0'
gem 'gitlab-sidekiq-fetcher', path: 'vendor/gems/sidekiq-reliable-fetch', require: 'sidekiq-reliable-fetch'

# parser cron
gem 'fugit', '~> 1.8.1'

# requests http
gem 'httparty', '~> 0.20.0'

# output colorido para o console
gem 'rainbow', '~> 3.0'

# barra de progresso
gem 'ruby-progressbar', '~> 1.10'

# biblioteca regex para expressões regulares
gem 're2', '~> 1.6.0'

# misc
gem 'semver_dialects', '~> 1.2.1'
gem 'version_sorter', '~> 2.3'

# exportar regex ruby para javascript
gem 'js_regex', '~> 3.8'

# parser de agente de usuário
gem 'device_detector'

# redis
gem 'redis', '~> 4.8.0'
gem 'connection_pool', '~> 2.0'

# armazenamento de sessão redis
gem 'redis-actionpack', '~> 5.3.0'

# integração ao discord
gem 'discordrb-webhooks', '~> 3.4', require: false

# integração ao jira
gem 'jira-ruby', '~> 2.1.4'
gem 'atlassian-jwt', '~> 0.2.0'

# integração ao slack
gem 'slack-messenger', '~> 2.3.4'

# integração ao hangouts chat
gem 'hangouts-chat', '~> 0.0.5', require: 'hangouts_chat'

# integração ao asana
gem 'asana', '~> 0.10.13'

# integração ao fogbugz
gem 'ruby-fogbugz', '~> 0.3.0'

# integração ao kubernetes
gem 'kubeclient', '~> 4.11.0'

# inteligência artificial
gem 'ruby-openai', '~> 3.7'
gem 'circuitbox', '2.0.0'

# sanitizar o input de usuário
gem 'sanitize', '~> 6.0'
gem 'babosa', '~> 1.0.4'

# sanitizar input svg
gem 'loofah', '~> 2.21.1'

# trabalhando com licença
# detecta a licença open-source do repositório
# versão precisa estar sincronizada com gitlab-org/gitaly
gem 'licensee', '~> 9.15'

# detecta e converte caracteres de string encodadas
gem 'charlock_holmes', '~> 0.7.7'

# detecta conteúdo mime do conteúdo
gem 'ruby-magic', '~> 0.6'

# blank mais rápido
gem 'fast_blank'

# capturar tempo e duração
gem 'gitlab-chronic', '~> 0.10.5'
gem 'gitlab_chronic_duration', '~> 0.10.6.2'
gem 'rack-proxy', '~> 0.7.6'
gem 'sassc-rails', '~> 2.1.0'
gem 'autoprefixer-rails', '10.2.5.1'
gem 'terser', '1.0.2'
gem 'addressable', '~> 2.8'
gem 'tanuki_emoji', '~> 0.6'
gem 'gon', '~> 6.4.0'
gem 'request_store', '~> 1.5.1'
gem 'base32', '~> 0.3.0'
gem 'gitlab-license', '~> 2.2.1'

# proteção contra bruteforcing
gem 'rack-attack', '~> 6.6.1'

# integração ao sentry
gem 'sentry-raven', '~> 3.1'
gem 'sentry-ruby', '~> 5.8.0'
gem 'sentry-rails', '~> 5.8.0'
gem 'sentry-sidekiq', '~> 5.8.0'

# parsing de query do postgresql
gem 'pg_query', '~> 2.2', '>= 2.2.1'
gem 'premailer-rails', '~> 1.10.3'
gem 'gitlab-labkit', '~> 0.32.0'
gem 'thrift', '>= 0.16.0'

# i18n
gem 'ruby_parser', '~> 3.20', require: false
gem 'rails-i18n', '~> 7.0'
gem 'gettext_i18n_rails', '~> 1.8.0'
gem 'gettext_i18n_rails_js', '~> 1.3'
gem 'gettext', '~> 3.3', require: false, group: :development
gem 'batch-loader', '~> 2.0.1'

# barra de perf
gem 'peek', '~> 1.1'

# suporte ao google cloud profiler
gem 'cloud_profiler_agent', '~> 0.0.0', path: 'vendor/gems/cloud_profiler_agent', require: false

# tracker de eventos snowplow
gem 'snowplow-tracker', '~> 0.8.0'

# métricas
gem 'webrick', '~> 1.8.1', require: false
gem 'prometheus-client-mmap', '~> 0.23', require: 'prometheus/client'
gem 'warning', '~> 1.3.0'

group :development do
    gem 'lefthook', '~> 1.3.13', require: false
    gem 'rubocop'
    gem 'solargraph', '~> 0.47.2', require: false
    gem 'letter_opener_web', '~> 2.0.0'
    gem 'lookbook', '~> 2.0', '>= 2.0.1'
    gem 'better_errors', '~> 2.10.0'
    gem 'sprite-factory', '~> 1.7'
    gem "listen", "~> 3.7"
end

group :development, :test do
    gem 'deprecation_toolkit', '~> 1.5.1', require: false
    gem 'bullet', '~> 7.0.2'
    gem 'pry-byebug'
    gem 'pry-rails', '~> 0.3.9'
    gem 'pry-shell', '~> 0.6.1'

    gem 'awesome_print', require: false

    gem 'database_cleaner', '~> 1.7.0'
    gem 'factory_bot_rails', '~> 6.2.0'
    gem 'rspec-rails', '~> 6.0.1'

    gem 'minitest', '~> 5.11.0'

    # gerar dados falsos
    gem 'ffaker', '~> 2.10'

    gem 'spring', '~> 4.1.0'
    gem 'spring-commands-rspec', '~> 1.0.4'

    gem 'gitlab-styles', '~> 10.0.0', require: false

    gem 'haml_lint', '~> 0.40.0', require: false
    gem 'bundler-audit', '~> 0.7.0.1', require: false

    # benchmarking e profiling
    gem 'benchmark-ips', '~> 2.11.0', require: false
    gem 'benchmark-memory', '~> 0.1', require: false

    gem 'knapsack', '~> 1.21.1'
    gem 'crystalball', '~> 0.7.0', require: false

    gem 'simple_po_parser', '~> 1.1.6', require: false

    gem 'png_quantizator', '~> 0.2.1', require: false

    gem 'parallel', '~> 1.19', require: false

    gem 'test_file_finder', '~> 0.1.3'

    gem 'sigdump', '~> 0.2.4', require: 'sigdump/setup'

    gem 'pact', '~> 1.63'
end

group :development, :test, :danger do
    gem 'gitlab-dangerfiles', '~> 3.10.0', require: false
end

group :development, :test, :coverage do
    gem 'simplecov', '~> 0.21', require: false
    gem 'simplecov-lcov', '~> 0.8.0', require: false
    gem 'simplecov-cobertura', '~> 1.3.1', require: false
    gem 'undercover', '~> 0.4.4', require: false
end

# gems necessárias em pipeline omnibus-gitlab
group :development, :test, :omnibus do
    gem 'license_finder', '~> 7.0', require: false
end

group :test do
    gem 'fuubar', '~> 2.2.0'
    gem 'rspec-retry', '~> 0.6.2'
    gem 'rspec_profiling', '~> 0.0.6'
    gem 'rspec-benchmark', '~> 0.6.0'
    gem 'rspec-parameterized', '~> 1.0', require: false

    gem 'capybara', '~> 3.39'
    gem 'capybara-screenshot', '~> 1.0.26'
    gem 'selenium-webdriver', '= 4.9.0'

    gem 'graphlyte', '~> 1.0.0'

    gem 'shoulda-matchers', '~> 5.1.0', require: false
    gem 'email_spec', '~> 2.2.0'
    gem 'webmock', '~> 3.18.1'
    gem 'rails-controller-testing'
    gem 'concurrent-ruby', '~> 1.1'
    gem 'test-prof', '~> 1.2.1'
    gem 'rspec_junit_formatter'
    gem 'guard-rspec'
    gem 'axe-core-rspec'

    # movido para test
    # https://gitlab.com/gitlab-org/gitlab/-/issues/217527
    gem 'derailed_benchmarks', require: false
end

gem 'octokit', '~> 4.15'
gem 'gitlab-mail_room', '~> 0.0.23', require: 'mail_room'
gem 'email_reply_trimmer', '~> 0.1'
gem 'html2text'
gem 'stackprof', '~> 0.2.25', require: false
gem 'rbtrace', '~> 0.4', require: false
gem 'memory_profiler', '~> 1.0', require: false
gem 'activerecord-explain-analyze', '~> 0.1', require: false

# oauth
gem 'oauth2', '~> 2.0'

# checador de saúde
gem 'health_check', '~> 3.0'

# informações de sistema
gem 'vmstat', '~> 2.3.0'
gem 'sys-filesystem', '~> 1.4.3'

# cliente ntp
gem 'net-ntp'

# suporte para chaves ssh
gem 'ssh_data', '~> 1.3'

# definições de protocolos spamcheck grpc
gem 'spamcheck', '~> 1.3.0'

# definições de protocolos kas grpc
gem 'gitaly', '~> 15.9.0-rc3'
gem 'grpc', '~> 1.42.0'
gem 'google-protobuf', '~> 3.22', '>= 3.22.3'
gem 'toml-rb', '~> 2.2.0'

# toggles de features
gem 'flipper', '~> 0.25.0'
gem 'flipper-active_record', '~> 0.25.0'
gem 'flipper-active_support_cache_store', '~> 0.25.0'
gem 'unleash', '~> 3.2.2'
gem 'gitlab-experiment', '~> 0.7.1'

# logging estruturado
gem 'lograge', '~> 0.5'
gem 'grape_logging', '~> 1.8'

# lookup de dns
gem 'gitlab-net-dns', '~> 0.9.2'

# lista de países
gem 'countries', '~> 4.0.0'
gem 'retriable', '~> 3.1.2'

# cache lru
gem 'lru_redux'

# https://gitlab.com/gitlab-org/gitlab/issues/197386
#
# config/initializers/mail_starttls_patch.rb
# https://github.com/mikel/mail/pull/1536
gem 'mail', '= 2.8.1'
gem 'mail-smtp_pool', '~> 0.1.0', path: 'vendor/gems/mail-smtp_pool', require: false
gem 'microsoft_graph_mailer', '~> 0.1.0', path: 'vendor/gems/microsoft_graph_mailer'

# encriptação de arquivos
gem 'lockbox', '~> 1.1.1'

# validação de emails
gem 'valid_email', '~> 0.1'

# json
gem 'json', '~> 2.6.3'
gem 'json_schemer', '~> 0.2.18'
gem 'oj', '~> 3.13.21'
gem 'oj-introspect', '~> 0.7'
gem 'multi_json', '~> 1.14.1'
gem 'yajl-ruby', '~> 1.4.3', require: 'yajl'
gem 'webauthn', '~> 3.0'

# utilidades de endereço de ip
gem 'ipaddress', '~> 0.8.3'
gem 'parslet', '~> 1.8'
gem 'ipynbdiff', path: 'vendor/gems/ipynbdiff'
gem 'ed25519', '~> 1.3.0'

# erro no track de cliente openai
# https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/development/rake_tasks.md#update-openapi-client-for-error-tracking-feature
gem 'error_tracking_open_api', path: 'vendor/gems/error_tracking_open_api'

# advisórios de vulnerabilidade
gem 'cvss-suite', '~> 3.0.1', require: 'cvss_suite'

# trabalhar com packages rpm
gem 'arr-pm', '~> 0.0.12'

# desenvolvimento remoto
gem 'devfile', '~> 0.0.17.pre.alpha1'

# parser de apple plist
gem 'CFPropertyList', '~> 3.0.0'
gem 'app_store_connect'

# verificação de telefone
gem 'telesignenterprise', '~> 2.2'

# patch bufferedio
# atualizar essa versão necessitará atualizar scripts/allowed_warnings.txt
gem 'net-protocol', '~> 0.1.3'
gem 'duo_api', '~> 1.3'