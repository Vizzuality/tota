class Admin::ThemesController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    Theme
  end

  def scoped_collection(collection)
    collection.order(:created_at)
  end

  def permitted_params
    [
      :title,
      :description
    ]
  end
end
