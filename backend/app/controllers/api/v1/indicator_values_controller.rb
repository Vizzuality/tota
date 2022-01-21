module API
  module V1
    class IndicatorValuesController < BaseController
      def index
        values = IndicatorValue
          .where(filters)
          .where(region: {active: true})
          .includes(:region, :indicator)

        render json: IndicatorValueBlueprint.render(
          values,
          root: :data,
          fields: fields
        )
      end

      def filter_keys_map
        {
          'indicator' => 'indicators.slug',
          'region' => 'regions.name',
          'region_slug' => 'regions.slug'
        }
      end
    end
  end
end
