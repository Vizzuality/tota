class Admin::UsersController < Admin::AdminController
  include Admin::Resources

  def update
    if params[:commit].blank?
      @resource.assign_attributes(resource_params)
      render :edit
    elsif update_user
      redirect_to resources_url, notice: "#{resource_name} was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def update_user
    if resource_params[:password].present?
      @resource.update(resource_params)
    else
      @resource.update_without_password(resource_params)
    end
  end

  def resource_class
    User
  end

  def scoped_collection(collection)
    collection.order(:created_at)
  end

  def permitted_params
    [
      :email,
      :name,
      :password,
      :password_confirmation,
      :account_type,
      region_ids: []
    ]
  end
end
