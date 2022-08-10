class Admin::AdditionalResourcesController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    AdditionalResource
  end

  def scoped_collection(collection)
    collection.includes(:region, :group).order(:created_at)
  end

  def permitted_params
    [
      :title,
      :group_id,
      :region_id,
      :link,
      :file
    ]
  end
end
