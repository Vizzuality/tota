module API
  module V1
    class WidgetsController < BaseController
      def index
        render json: WidgetBlueprint.render(
          Widget.where(filters).includes(:theme),
          root: :data,
          fields: fields
        )
      end
    end
  end
end
