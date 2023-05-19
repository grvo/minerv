# frozen_string_literal: true

# requires
require 'gitlab'
require_relative 'default_options'

class UpdateIssue
    def initialize(options)
        @project = options.fetch(:project)

        # forçar o token para ser uma string então se o if api_token for nil, setar para ''
        api_token = options.delete(:api_token).to_s

        warn "No API token given." if api_token.empty?

        @client = Gitlab.client(
            endpoint: options.delete(:endpoint) || API::DEFAULT_OPTIONS[:endpoint],
            private_token: api_token
        )
    end

    def execute(issue_iid, issue_data)
        client.edit_issue(project, issue_iid, issue_data)
    end

    private

    attr_reader :project, :client
end