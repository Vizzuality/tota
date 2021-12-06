class Admin::WidgetsController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    Widget
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
      :sources
    ]
  end
end
