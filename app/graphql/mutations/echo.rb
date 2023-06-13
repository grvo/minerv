# frozen_string_literal: true

module Mutations
	class Echo < BaseMutation
		graphql_name 'EchoCreate'
		
		description <<~DOC
			uma mutação que não performa nenhuma mudança.
			
			isso é esperado para ser utilizado para testes de endpoints, para verificar
			que um usuário possua acesso à mutações.
		DOC
		
		argument :errors,
				 type: [::GraphQL::Types::String],
				 required: false,
				 description: 'erros para retornarem para o usuário.'
		
		argument :messages,
				 type: [::GraphQL::Types::String],
				 as: :echoes,
				 required: false,
				 description: 'mensagens para retornarem para o usuário.'
		
		field :echoes,
			  type: [::GraphQL::Types::String],
			  null: true,
			  description: 'mensagens retornadas para o usuário.'
		
		def resolve(**args)
			args
		end
	end
end
