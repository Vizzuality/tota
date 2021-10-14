module API
  module V1
    class OrganizationsController < BaseController
      def index
        organizations = Organization.where(filters).includes(:region, :business_type)

        if params[:format] == 'geojson'
          render json: {
            type: 'FeatureCollection',
            features: PointGeojsonBlueprint.render_as_hash(
              organizations,
              blueprint_options: {
                fields: fields || [:name]
              }
            )
          }
        else
          render json: OrganizationBlueprint.render(
            organizations,
            root: :data,
            fields: fields
          )
        end
      end
    end
  end
end
