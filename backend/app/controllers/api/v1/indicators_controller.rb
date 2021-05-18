module API
  module V1
    class IndicatorsController < BaseController
      def index
        render json: IndicatorBlueprint.render(
          Indicator.where(filters).includes(:indicator_values),
          root: :data
        )
      end
    end
  end
end
