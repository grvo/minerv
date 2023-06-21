# frozen_string_literal: true

class CiMinutesUsageMailer < ApplicationMailer
    helper EmailsHelper

    layout 'mailer'

    def notify(namespace, recipients)
        @namespace = namespace

        mail_with_locale(
            bcc: recipients,

            subject: "ação necessária: não há minutos restantes de pipeline para #{@namespace.name}"
        )
    end

    def notify_limit(namespace, recipients, percentage_of_available_mins)
        @namespace = namespace
        @percentage_of_available_mins = percentage_of_available_mins

        mail_with_locale(
            bcc: recipients,

            subject: "ação necessária: menos de #{percentage_of_available_mins}% " \
                     "dos minutos de pipeline restantes para #{@namespace.name}"
        )
    end
end
