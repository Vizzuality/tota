class Admin::WidgetsController < Admin::AdminController
  include Admin::Resources

  before_action :set_breadcrumbs, except: [:index, :update_position]

  def index
    skip_policy_scope
    redirect_to admin_themes_url
  end

  def update_position
    set_resource
    authorize_resource

    @resource.insert_at params[:position].to_i
  end

  private

  def resource_class
    Widget
  end

  # this is route for successful update path
  def resources_url
    admin_theme_url(@resource.theme)
  end

  def permitted_params
    [
      :title,
      :sub_title,
      :description,
      :note,
      :public,
      sources_attributes: [:link, :text, :note, :_destroy]
    ]
  end
end
