# frozen_string_literal: true

require 'spec_helper'

RSpec.describe Security::VulnerabilitiesController, feature_category: :vulnerability_management do
	let_it_be(:user) { create(:user) }
	
	describe 'GET #index' do
		subject { get :index }
		
		it_behaves_like Security::ApplicationController do
			let(:security_application_controller_child_action) do
				subject
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
				
				context 'está desativado' do
					it { is_expected.to have_gitlab_http_status(:not_found) }
					it { is_expected.to render_template('errors/not_found') }
				end
			end
		end
	end
