class Admin::AdditionalResourceGroupsController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    AdditionalResourceGroup
  end

  def scoped_collection(collection)
    collection.order(:created_at)
  end

  def permitted_params
    [
      :name
    ]
  end
end
