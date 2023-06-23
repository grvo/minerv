# frozen_string_literal: true

module Clusters
    class AgentPolicy < BasePolicy
        alias_method :cluster_agent, :subject

        delegate { cluster_agent.project }

        # essa condição é mais expansiva que a mesma permissão de check em projectpolicy,
        # então tendo uma pontuação maior
        condition(:ci_access_authorized_agent, score: 10) do
            @subject.ci_access_authorized_for?(@user)
        end

        condition(:user_access_authorized_agent, score: 10) do
            @subject.user_access_authorized_for?(@user)
        end

        rule { ci_access_authorized_agent | user_access_authorized_agent }.policy do
            enable :read_cluster_agent
        end
    end
end
