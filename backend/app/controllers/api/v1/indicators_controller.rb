module API
  module V1
    class IndicatorsController < BaseController
      def index
        render json: IndicatorBlueprint.render(
          Indicator.all.includes(:indicator_values),
          root: :data
        )
      end
    end
  end
end
