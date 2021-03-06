module Indicators
  class AirportTotalDestinations < DynamicIndicator
    DEPENDS_ON = %w[airport_arrivals_by_origin_weekly].freeze

    def regenerate
      Indicator.find_by(slug: 'airport_total_destinations')&.delete
      generate
    end

    def generate
      airport_total_destinations = create_indicator('airport_total_destinations')
      airport_arrivals_by_origin = Indicator.find_by(slug: 'airport_arrivals_by_origin_weekly')

      return unless airport_arrivals_by_origin.present?

      # category_1 is origin port
      # category_2 is destination port
      values = airport_arrivals_by_origin
        .indicator_values
        .group_by { |v| [v.category_2, v.year] }
        .map do |(airport, year), arrivals|
          airport_total_destinations.indicator_values.build(
            region: arrivals.first.region,
            date: year.to_s,
            category_2: airport,
            value: arrivals.map(&:category_1).uniq.count
          )
        end

      IndicatorValue.import! values, all_or_none: true
    end
  end
end
