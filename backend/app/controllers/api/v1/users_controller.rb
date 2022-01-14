module API
  module V1
    class UsersController < BaseController
      before_action :authenticate_user!

      def show
        render json: { data: current_user.slice(:name, :email) }
      end
    end
  end
end
