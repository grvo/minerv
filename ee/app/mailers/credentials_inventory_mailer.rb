#frozen_string_literal: true

class CredentialsInventoryMailer < ApplicationMailer
    helper EmailsHelper

    layout 'mailer'

    def personal_access_token_revoked_email(token:, revoked_by:)
        @revoked_by = revoked_by
        @token = token

        mail_with_locale(
            to: token.user.notification_email_or_default,

            subject: _('seu token de acesso pessoal foi revocado')
        )
    end

    def ssh_key_deleted_email(params:, deleted_by:)
        @deleted_by = deleted_by
        @params = params

        mail_with_locale(
            to: params[:notification_email],

            subject: _('sua chave ssh foi deletada')
        )
    end
end
