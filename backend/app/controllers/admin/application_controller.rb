class Admin::ApplicationController < ActionController::Base
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
end
