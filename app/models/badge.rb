# frozen_string_literal: true

class Badge < ApplicationRecord
    include FromUnion
    
    # essa estrutura seta os placeholders que os urls podem ter
    PLACEHOLDERS = {
        'project_path' => :full_path,
        'project_title' => :title,
        'project_name' => :path,
        'project_id' => :id,
        'default_branch' => :default_branch,
        'commit_sha' => ->(project) { project.commit&.sha }
    }.freeze

    # esse regex é construído dinamicamente usando as keys da estrutura placeholder
    # pode-se facilmente adicionar novos placeholders apenas mudando o hash
    PLACEHOLDERS_REGEX = /(#{PLACEHOLDERS.keys.join('|')})/.freeze

    default_scope { order_created_at_asc } # rubocop:disable cop/defaultscope

    scope :order_created_at_asc, -> { reorder(created_at: :asc) }
    scope :with_name, ->(name) { where(name: name) }

    validates :link_url, :image_url, addressable_url: true
    validates :type, presence: true

    def rendered_link_url(project = nil)
        build_rendered_url(link_url, project)
    end
    
    def rendered_image_url(project = nil)
        Gitlab::AssetProxy.proxy_url(
            build_rendered_url(image_url, project)
        )
    end
    
    private
    
    def build_rendered_url(url, project = nil)
        return url unless project
    
        Gitlab::StringPlaceholderReplacer.replace_string_placeholders(url, PLACEHOLDERS_REGEX) do |arg|
            replace_placeholder_action(PLACEHOLDERS[arg], project)
        end
    end

    # o parâmetro action representa o :symbol ou proc para chamar em ordem
    # esse método checa se é um proc e se usa o método de chamada
    def replace_placeholder_action(action, project)
        return unless project
    
        action.is_a?(Proc) ? action.call(project) : project.public_send(action) # rubocop:disable gitlabsecurity/publicsend
    end
end    