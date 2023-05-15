# frozen_string_literal: true

# em vez de necessitar de bundle/setup diretamente, necessitar do seguinte
# para fazer o bandler mais consistente quando estiver para carregar do
# bundler de configuração. veja mais nos links abaixo
#
# https://gitlab.com/gitlab-org/gitlab/-/issues/339939
# https://github.com/rubygems/rubygems/pull/4892
# https://github.com/rubygems/rubygems/issues/3363

require 'bundler'

ENV['BUNDLE_GEMFILE'] ||= Bundler.settings[:gemfile] || File.expand_path('../Gemfile', __dir__)

Bundler::SharedHelpers.set_env('BUNDLE_GEMFILE', ENV['BUNDLE_GEMFILE'])

if Bundler.respond_to?(:reset_settings_and_root!)
    Bundler.reset_settings_and_root!
else
    # bundler v2.1.4 não possui esse método, fazer o mesmo com o bundler v2.2.26
    # https://github.com/rubygems/rubygems/blob/bundler-v2.2.26/bundler/lib/bundler.rb#L612-L615
    Bundler.instance_eval do
        @settings = nil
        @root = nil
    end
end

require 'bundler/setup'