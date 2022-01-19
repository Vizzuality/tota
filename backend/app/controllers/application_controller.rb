class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :set_current_user

  layout :layout_by_resource

  private

  def layout_by_resource
    if devise_controller?
      'devise'
    else
      'application'
    end
  end

  def set_current_user
    ::Current.user = current_user
  end

  def after_sign_in_path_for(_resource)
    return admin_root_path if current_user.admin?

    flash.discard(:notice)
    '/'
  end
end
