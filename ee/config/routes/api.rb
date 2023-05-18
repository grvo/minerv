
# necessário pelo geo com ulrs unificados, requests regulares para /api/graphql
# proxado para o primário, enquanto esses são requests locais
match '/api/v4/geo/graphql', via: [:get, :post], to: 'graphql#execute'