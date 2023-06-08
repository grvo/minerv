# frozen_string_literal: true

# hostnamevalidator
#
# validador personalizado para hosts
#
# similar à um validador de uri, porém, certificará de que
# não tenha um schema ou path presente. apenas uma parte de domínio.

class HostValidator < ActiveModel::EachValidator
    def validate_each(record, attribute, value)
        unless valid_host?(value)
            record.errors.add(attribute, 'precisa ser um nome de host válido')
        end
    end

    private

    def valid_host?(value)
        URI.parse("http://#{value}").host == value
    rescue URI::InvalidURIError
        false
    end
end