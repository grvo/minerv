# frozen_string_literal: true

require 'spec_helper'

RSpec.describe Security::DashboardController, feature_category: :vulnerability_management do
	let_it_be(:user) { create(:user) }
	
	describe 'GET #show' do
		subject { get :show }
		
		it_behaves_like Security::ApplicationController do
			let(:security_application_controller_child_action) do
				get :show
			end
		end
		
		context 'quando feature de dashboard de segurança' do
			before do
				sign_in(user)
			end
			
			context 'está ativado' do
				before do
					stub_licensed_features(security_dashboard: true)
				end
				
				it { is_expected.to render_template(:instance_security) }
			end
			
			context '' do
				it { is_expected.to have_gitlab_http_status(:not_found) }
				it { is_expected.to render_template('errors/not_found') }
			end
		end
	end
end
