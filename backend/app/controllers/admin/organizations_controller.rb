class Admin::OrganizationsController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    Organization
  end

  def resource_name
    'TOTA Member'
  end

  def scoped_collection(collection)
    collection.includes(:region, :business_type)
  end
end
