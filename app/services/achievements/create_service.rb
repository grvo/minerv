# frozen_string_literal: true

module Achievements
    class CreateService < BaseService
        def execute
            return error_no_permissions unless allowed?

            achievement = Achievements::Achievement.create(params.merge(namespace_id: @namespace.id))

            return error_creating(achievement) unless achievement.persisted?

            ServiceResponse.success(payload: achievement)
        end

        private

        def error_no_permissions
            error('você não tem permissões suficientes para criar uma conquista para esse namespace')
        end

        def error_creating(achievement)
            error(achievement&.errors&.full_messages || 'falha ao criar conquista')
        end
    end
end