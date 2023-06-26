# frozen_string_literal: true

module API
    class Geo < ::API::Base
        feature_category :geo_replication

        urgency :low

        helpers do
            # substituído no ee
            def geo_proxy_response
                { geo_enabled: false }
            end
        end

        resource :geo do
            desc 'retorna uma response de proxy do geo' do
                summary "determina se o site geo deve solicitar o proxy"

                success code: 200

                failure [{ code: 403, message: 'proibido' }]

                tags %w[geo]
            end

            # workhorse chama por isso para determinar se é um site geo que deve
            # solicitar proxy. workhorse não sabe se é um contexto foss/ee.
            get '/proxy' do
                require_gitlab_workhorse!

                status :ok
                content_type Gitlab::Workhorse::INTERNAL_API_CONTENT_TYPE

                geo_proxy_response
            end
        end
    end
end

API::Geo.prepend_mod
