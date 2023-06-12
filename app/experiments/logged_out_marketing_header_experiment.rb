# frozen_string_literal: true

class LoggedOutMarketingHeaderExperiment < ApplicationExperiment
    # esses comportamentos padrão são substituídos no applicatiohelper e no cabeçalho
    # parcial de template
  
    control {}
    candidate {}

    variant(:trial_focused) {}
end
