module API
  module V1
    class UsersController < BaseController
      before_action :authenticate_user!

      def show
        render json: UserBlueprint.render(
          current_user,
          root: :data
        )
      end
    end
  end
end
