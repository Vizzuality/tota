module API
  module V1
    class IndicatorsController < BaseController
      def index
        # render json: IndicatorSerializer.new(
        #   Indicator.all.includes(:indicator_values), fields: fields
        # )
        render json: IndicatorBlueprint.render(
          Indicator.where(filters).includes(:indicator_values),
          root: :data
        )
      end
    end
  end
end
