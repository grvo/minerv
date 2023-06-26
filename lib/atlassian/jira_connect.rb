# frozen_string_literal: true

module Atlassian
    module JiraConnect
        class << self
            def app_name
                "minerv para jira (#{gitlab_host})"
            end

            def app_key
                # app key deve ter <= que 64 caracteres
                # veja: https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/#app-descriptor-structure

                "gitlab-jira-connect-#{gitlab_host}"[..63]
            end

            private

            def gitlab_host
                return host_from_settings if Gitlab::CurrentSettings.jira_connect_proxy_url?

                Gitlab.config.gitlab.host
            end

            def host_from_settings
                uri = URI(Gitlab::CurrentSettings.jira_connect_proxy_url)

                uri.hostname + uri.path
            end
        end
    end
end
