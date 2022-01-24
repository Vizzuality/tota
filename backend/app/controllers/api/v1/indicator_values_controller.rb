module API
  module V1
    class IndicatorValuesController < BaseController
      before_action :ensure_indicators_whitelist!

      def index
        values = IndicatorValue
          .where(filters)
          .where(indicators: {slug: @indicators_whitelist})
          .where(regions: {active: true})
          .includes(:region, :indicator)

        # filter values only for visible regions
        # if user.nil? we don't have to filter that as all private widgets data is filtered out already
        values = values.where(regions: current_user.visible_regions) if current_user.present?

        render json: IndicatorValueBlueprint.render(
          values,
          root: :data,
          fields: fields
        )
      end

      private

      def ensure_indicators_whitelist!
        raise API::Error, 'filter[widget] is mandatory for this endpoint' unless filter_params&.dig(:widget).present?

        indicators = authorized_widgets.flat_map { |w| w.config['indicators'] }.compact.uniq
        indicators.push(*common_stats_indicators) if widget_slugs.include? 'common_stats'
        @indicators_whitelist = indicators
      end

      def authorized_widgets
        policy_scope(Widget.where(slug: widget_slugs), policy_scope_class: WidgetPolicy::Scope)
      end

      def widget_slugs
        filter_params[:widget].split(',')
      end

      def common_stats_indicators
        %w[size_tourism_region_km2
           population_by_tourism_region
           tourism_employment_by_tourism_region_monthly
           total_employment_by_tourism_region_monthly]
      end

      def filter_keys_map
        {
          'indicator' => 'indicators.slug',
          'region' => 'regions.name',
          'region_slug' => 'regions.slug',
          'widget' => nil
        }
      end
    end
  end
end
