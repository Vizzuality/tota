module API
  module V1
    class OrganizationsController < BaseController
      def index
        organizations = Organization.where(filters).includes(:region, :business_type)

        if params[:format] == 'geojson'
          render json: {
            type: 'FeatureCollection',
            features: organizations.map { |o| o.as_geojson(fields) }
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
