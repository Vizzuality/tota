module API
  module V1
    class OrganizationsController < BaseController
      def index
        organizations = Organization
          .visible
          .where(filters.except('regions.slug'))
          .with_regions
          .includes(:business_type_1, :business_type_2)
        organizations = filter_by_region(organizations) if filters['regions.slug']

        if params[:format] == 'geojson'
          render json: {
            type: 'FeatureCollection',
            features: PointGeojsonBlueprint.render_as_hash(
              organizations,
              blueprint_options: {
                fields: fields
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

      private

      def filter_by_region(scope)
        scope.ransack(
          region_slug_or_region_parent_slug_in: filters['regions.slug']
        ).result
      end
    end
  end
end
