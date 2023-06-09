# frozen_string_literal: true

class UserAgentDetailService
    def initialize(spammable:, spam_params:)
        @spammable = spammable
        @spam_params = spam_params
    end

    def create
        unless spam_params&.user_agent && spam_params&.ip_address
            message = 'criação de useragentdetail pulada porque spam_params necessários não foram recebidos'

            return ServiceResponse.success(message: messasge)
        end

        spammable.create_user_agent_detail(user_agent: spam_params.user_agent, ip_address: spam_params.ip_address)
    end

    private

    attr_reader :spammable, :spam_params
end