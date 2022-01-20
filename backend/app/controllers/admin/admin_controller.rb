class Admin::AdminController < Admin::ApplicationController
  include Admin::Authorization
  include Admin::Breadcrumbs
  include Pagy::Backend

  before_action :redirect_no_admins

  layout 'admin'

  private

  def redirect_no_admins
    redirect_to '/' unless current_user.admin?
  end
end
