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

      def update
        render json: {status: 'ok'}, status: :ok
      end
    end
  end
end
