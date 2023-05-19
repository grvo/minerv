# frozen_string_literal: true

# requires
require 'gitlab'
require_relative 'default_options'

class CreateMergeRequestDiscussion
    def initialize(options)
        @merge_request = options.fetch(:merge_request)
        @project = options.fetch(:project)

        # se api_token é nil, setar para '' para permitir requests não autenticados
        api_token = options.fetch(:api_token, '')

        warn "nenhum token de api recebido." if api_token.empty?

        @client = Gitlab.client(
            endpoint: options.fetch(:endpoint, API::DEFAULT_OPTIONS[:endpoint]),

            private_token: api_token
        )
    end

    def execute(content)
        client.create_merge_request_discussion(
            project,
            merge_request.fetch('iid'),
            body: content
        )
    end

    private

    attr_reader :merge_request, :client, :project
end