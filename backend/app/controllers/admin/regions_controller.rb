class Admin::RegionsController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    Region
  end

  def scoped_collection(collection)
    collection.where.not(region_type: :tourism_subregion).order(:created_at)
  end

  def permitted_params
    [
      :name,
      :active
    ]
  end
end
