module API
  module V1
    class IndicatorsController < BaseController
      def index
        render json: IndicatorSerializer.new(
          Indicator.all.includes(:indicator_values), fields: fields
        )
      end
    end
  end
end
