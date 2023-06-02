# frozen_string_literal: true

# fornece uma interface semelhante ao activerecord para um modelo cujos dados não são persistidos em um banco de dados
module StaticModel
    extend ActiveSupport::Concern

    class_methods do
        # usado pela associação polimórfica do activerecord para definir object_id
        def primary_key
            'id'
        end

        # usado pela associação polimórfica do activerecord para definir object_type
        def base_class
            self
        end
    end

    # usado pelo ar para buscar atributos
    #
    # passar adiante se respondermos a ela
    def [](key)
        send(key) if respond_to?(key) # rubocop:disable gitlabsecurity/publicsend
    end

    def to_param
        id
    end

    def new_record?
        false
    end

    def persisted?
        false
    end

    def destroyed?
        false
    end

    def ==(other)
        other.present? && other.is_a?(self.class) && id == other.id
    end
end