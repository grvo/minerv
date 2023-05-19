# frozen_string_literal: true

# requires
require 'gitlab'
require_relative 'default_options'

class Base
    def initialize(options)
        @project = options.fetch(:project)

        # se api_token é nil, setar para '' para permitir requests não autenticados
        api_token = options[:api_token] || ''

        warn "nenhum token de api recebido." if api_token.empty?

        @client = Gitlab.client(
            endpoint: options.fetch(:endpoint, API::DEFAULT_OPTIONS[:endpoint]),

            private_token: api_token
        )
    end

    def execute
        raise NotImplementedError
    end

    private

    attr_reader :project, :client
end