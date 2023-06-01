# frozen_string_literal: true

if $LOADED_FEATURES.include?(File.expand_path('spec_helper.rb', __dir__))
    # não há necessidade de carregar nada aqui se spec_helper já estiver carregado
    # porque spec_helper é mais extenso que fast_spec_helper

    return
end

require_relative '../config/bundler_setup'

ENV['GITLAB_ENV'] = 'test'
ENV['IN_MEMORY_APPLICATION_SETTINGS'] = 'true'

require './spec/deprecation_warnings'

# habilitar modo zero monkey patching antes de carregar qualquer outro código rspec
RSpec.configure(&:disable_monkey_patching!)

require 'active_support/all'
require 'pry'
require_relative 'rails_autoload'

require_relative '../config/settings'
require_relative 'support/rspec'
require_relative '../lib/gitlab/utils'
require_relative '../lib/gitlab/utils/strong_memoize'

require_relative 'simplecov_env'
SimpleCovEnv.start!

ActiveSupport::XmlMini.backend = 'Nokogiri'

# considere ajustar a configuração em `spec/support/rspec.rb`, que também é
# usado por `spec/spec_helper.rb`