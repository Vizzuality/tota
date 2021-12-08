class Admin::WidgetsController < Admin::AdminController
  include Admin::Resources

  def index
    skip_policy_scope
    redirect_to admin_themes_url
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
      sources_attributes: [:link, :text, :note, :_destroy]
    ]
  end
end
