# frozen_string_literal: true

# baseado em https://github.com/rmosolgo/graphql-ruby/blob/v1.11.8/lib/graphql/subscriptions/action_cable_subscriptions.rb#L19-L82
# modificado para trabalhar com meu próprio cliente actioncablelink

class GraphqlChannel < ApplicationCable::Channel # rubocop:disable gitlab/namespacedclass
    def subscribed
        @subscriptions_ids = []

        query = params['query']
        variables = Gitlab::Graphql::Variables.new(params['variables']).to_h
        operation_name = params['operationName']

        result = GitlabSchema.execute(
            query,
            context: context,
            variables: variables,
            operation_name: operation_name
        )

        payload = {
            result: result.to_h,
            more: result.subscription?
        }

        # trackar a inscrição aqui para então remover no unsubscribe
        @subscription_ids << result.context[:subscription_id] if result.context[:subscription_id]

        transmit(payload)
    end

    def unsubscribed
        @subscription_ids.each do |sid|
            GitlabSchema.subscriptions.delete_subscription(sid)
        end
    end

    rescue_from Gitlab::Graphql::Variables::Invalid do |exception|
        transmit({ errors: [{
            message: exception.message
        }] })
    end

    private

    def context
        {
            channel: self,
            current_user: current_user,
            is_sessionless_user: false
        }
    end
end