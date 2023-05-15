# frozen_string_literal: true

module Diffs
    class BaseComponent < ViewComponent::Base
        warn_on_deprecated_slot_setter

        # para fazer as partials converterem para componentes mais fáceis:
        # delegar todos os métodos ausentes para os helpers;
        # onde eles provavelmente estão
        delegate_missing_to :helpers
    end
end