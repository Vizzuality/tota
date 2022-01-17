module API
  module Authentication
    include Devise::Controllers::Helpers

    def authenticate_user!
      raise API::UnauthorizedError, 'You need to sign in before making this request' if current_user.nil?
    end
  end
end
