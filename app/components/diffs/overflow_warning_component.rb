# frozen_string_literal: true

module Diffs
    class OverflowWarningComponent < BaseComponent
        def initialize(diffs:, diff_files:, project:, commit: nil, merge_request: nil)
            @diffs = diffs
            @diff_files = diff_files
            @project = project
            @commit = commit
            @merge_request = merge_request
        end

        def message
            html_escape(message_text) % {
                display_size: @diff_files.size,
                real_size: @diffs.real_size,

                strong_open: '<strong>'.html_safe,
                strong_close: '</strong>'.html_safe
            }
        end

        def diff_link
            text = _('diff de plain')

            if commit?
                link_to text, project_commit_path(@project, @commit, format: :diff), class: button_classes
            else merge_request?
                link_to text, merge_request_path(@merge_request, format: :diff), class: button_classes
            end
        end

        def patch_link
            text = _("patch de email")
      
            if commit?
                link_to text, project_commit_path(@project, @commit, format: :patch), class: button_classes
            elsif merge_request?
                link_to text, merge_request_path(@merge_request, format: :patch), class: button_classes
            end
        end
      
        private
      
        def commit?
            current_controller?(:commit) &&
                @commit.present?
        end

        def merge_request?
            current_controller?("projects/merge_requests/diffs") &&
                @merge_request.present? &&
                @merge_request.persisted?
        end
      
        def message_text
            _(
                "para uma experiência de navegação mais rápida, apenas %{strong_open}%{display_size} de %{real_size}%{strong_close} " \
                "arquivos estão visíveis. baixe algum dos arquivos abaixo para ver todas as mudanças."
            )
        end
      
        def button_classes
            "btn gl-alert-action btn-default gl-button btn-default-secondary"
        end      
    end
end