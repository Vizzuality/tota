module Admin::Authorization
  extend ActiveSupport::Concern

  included do
    include Pundit::Authorization

    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  end

  def user_not_authorized
    flash[:alert] = 'You are not authorized to perform this action.'
    redirect_to(request.referrer || root_path)
  end
end
