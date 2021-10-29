class Admin::UsersController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    User
  end

  def scoped_collection(collection)
    collection.order(:created_at)
  end

  def permitted_params
    [
      :email,
      :name
    ]
  end
end
