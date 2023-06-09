# frozen_string_literal: true

class Admin::LabelsController < Admin::ApplicationController
	before_action :set_label, only: [:show, :edit, :update, :destroy]

	feature_category :team_planning

	urgency :low

	def index
		@labels = Label.templates.page(params[:page])
	end

	def show
	end

	def new
		@label = Label.new
	end

	def edit
	end

	def create
		@label = Labels::CreateService.new(label_params).execute(template: true)

		if @label.persisted?
			redirect_to admin_labels_url, notice: _("label foi criado")
		else
			render :new
		end
	end

	def update
    	@label = Labels::UpdateService.new(label_params).execute(@label)

    	if @label.valid?
      		redirect_to admin_labels_path, notice: _('label atualizado com sucesso.')
    	else
      		render :edit
    	end
  	end

  	def destroy
    	@label.destroy
    	@labels = Label.templates

    	respond_to do |format|
      		format.html do
        		redirect_to admin_labels_path, status: :found, notice: _('label foi removido')
      		end
			
      		format.js { head :ok }
    	end
  	end

  	private

  	def set_label
    	@label = Label.find(params[:id])
  	end

  	def label_params
    	params[:label].permit(:title, :description, :color)
  	end
end
