class Admin::DevelopmentFundsController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    DevelopmentFund
  end

  def scoped_collection(collection)
    collection.includes(:region)
  end
end
