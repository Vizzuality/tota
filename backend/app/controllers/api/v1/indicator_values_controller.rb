module API
  module V1
    class IndicatorValuesController < BaseController
      def index
        values = IndicatorValue
          .where(filters)
          .where(regions: {active: true})
          .includes(:region, :indicator)

        values = policy_scope(values, policy_scope_class: IndicatorValuePolicy::APIScope)

        render json: IndicatorValueBlueprint.render(
          values,
          root: :data,
          fields: fields
        )
      end

      private

      def filter_keys_map
        {
          'indicator' => 'indicator.slug',
          'region' => 'regions.name',
          'region_slug' => 'regions.slug'
        }
      end
    end
  end
end
