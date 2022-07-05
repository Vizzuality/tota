module API
  module V1
    class DevelopmentFundsController < BaseController
      def index
        funds = DevelopmentFund.where(filters.except('regions.slug')).includes(:region)
        funds = filter_by_region(funds) if filters['regions.slug']

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

      private

      def filter_by_region(scope)
        scope.ransack(region_slug_or_region_parent_slug_in: filters['regions.slug']).result
      end
    end
  end
end
