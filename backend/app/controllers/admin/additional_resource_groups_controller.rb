class Admin::AdditionalResourceGroupsController < Admin::AdminController
  include Admin::Resources

  private

  def default_sort
    'position'
  end

  def resource_class
    AdditionalResourceGroup
  end

  def scoped_collection(collection)
    collection.order(:created_at)
  end

  def permitted_params
    [
      :name,
      :position
    ]
  end
end
