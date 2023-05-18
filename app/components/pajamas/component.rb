# frozen_string_literal: true

module Pajamas
	class Component < ViewComponent::Base
		warn_on_deprecated_slot_setter
		
		private
		
		# filtrar o valur obtido na lista de valores permitidos
		# se o valor é recebido e não é permitido, retornar default one
		#
		# @param [Object] value
		# @param [Enumerable] allowed_values
		# @param [Object] default
		def filter_attribute(value, allowed_values, default: nil)
			return default unless value
			return value if allowed_values.include?(value)
			
			default
		end
		
		# adicionar classes css e opções adicionais no hash de opções existente
		#
		# @param [Hash] options
		# @param [Array] css_classes
		# @param [Hash] additional_option
		def format_options(options:, css_classes: [], additional_options: {})
			options.merge({ class: [*css_classes, options[:class]].flatten.compact }, additional_options)
		end
	end
end
