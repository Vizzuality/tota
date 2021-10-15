module API
  module V1
    class DevelopmentFundsController < BaseController
      def index
        funds = DevelopmentFund.where(filters).includes(:region)

        if params[:format] == 'geojson'
          render json: {
            type: 'FeatureCollection',
            features: PointGeojsonBlueprint.render_as_hash(
              funds,
              blueprint_options: {
                fields: fields
              }
            )
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
