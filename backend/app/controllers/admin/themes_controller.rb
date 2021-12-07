class Admin::ThemesController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    Theme
  end

  def permitted_params
    [
      :title,
      :description
    ]
  end
end
