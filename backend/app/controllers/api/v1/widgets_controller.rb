module API
  module V1
    class WidgetsController < BaseController
      def index
        filtered = Widget.where(filters).includes(:theme).order(:theme_id, :position)
        widgets = policy_scope(filtered)

        render json: WidgetBlueprint.render(
          widgets,
          root: :data,
          fields: fields,
          user: current_user
        )
      end
    end
  end
end
