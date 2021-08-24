module API
  module V1
    class DevelopmentFundsController < BaseController
      def index
        funds = DevelopmentFund.where(filters).includes(:region)

        if params[:format] == 'geojson'
          render json: {
            type: 'FeatureCollection',
            features: funds.map { |f| f.as_geojson(fields) }
          }
        else
          render json: DevelopmentFundBlueprint.render(
            funds,
            root: :data,
            fields: fields
          )
        end
      end
    end
  end
end
