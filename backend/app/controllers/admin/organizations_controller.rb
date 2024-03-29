class Admin::OrganizationsController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    Organization
  end

  def scoped_collection(collection)
    collection.with_regions.includes(:business_type_1, :business_type_2)
  end
end
