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

  # this controls submit successful route redirect
  def resources_url
    admin_theme_url(@resource.theme)
  end

  def scoped_collection(collection)
    collection.includes(:theme)
  end

  def permitted_params
    [
      :title,
      :sub_title,
      :description,
      :note,
      sources_attributes: [:link, :text, :note]
    ]
  end
end
