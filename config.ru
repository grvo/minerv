# frozen_string_literal: true

# esse arquivo é usado pelos servidores rack-based para iniciar a aplicação

require ::File.expand_path('config/environment', __dir__)

warmup do |app|
    client = Rack::MockRequest.new(app)
    
    client.get('/')
end

map ENV['RAILS_RELATIVE_URL_ROOT'].presence || "/" do
    use Gitlab::Middleware::ReleaseEnv
    use Gitlab::Application
end