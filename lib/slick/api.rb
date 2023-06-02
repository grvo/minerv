# frozen_string_literal: true

# cliente para interagir com a api do slack
#
# https://api.slack.com/web
module Slack
    class API
        BASE_URL = 'https://slack.com/api'
        BASE_HEADERS = { 'Content-Type' => 'application/json; charset=utf-8' }.freeze

        def initialize(slack_installation)
            @token = slack_installation.bot_access_token

            raise ArgumentError, "nenhum token para instalação do slack #{slack_installation.id}" unless @token
        end

        def post(api_method, payload)
            url = "#{BASE_URL}/#{api_method}"
            headers = BASE_HEADERS.merge('Authorization' => "portador #{token}")

            Gitlab::HTTP.post(url, body: payload.to_json, headers: headers)
        end

        private

        attr_reader :token
    end
end