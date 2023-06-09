# frozen_string_literal: true

# ldapfilteralidator
#
# validador customizado para filtros ldap
#
# exemplo:
#
# class LdapGroupLink < ActiveRecord::Base
#     validates :filter, ldap_filter: true
# end

class LdapFilterValidator < ActiveModel::EachValidator
    def validate_each(record, attribute, value)
        Net::LDAP::Filter::FilterParser.parse(value)
    rescue Net::LDAP::FilterSyntaxInvalidError
        record.errors.add(attribute, 'precisa ser um filtro válido')
    end
end