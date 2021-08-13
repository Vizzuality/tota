module Indicators
  class AirportTopAverageConnectionsPerWeek
    include Singleton

    class << self
      delegate :generate, :regenerate, to: :instance
    end

    def regenerate
      Indicator.find_by(slug: 'airport_top_average_connections_per_week')&.destroy
      generate
    end

    def generate
      airport_total_destinations = Indicator.create(slug: 'airport_top_average_connections_per_week')
      airport_arrivals_by_origin = Indicator.find_by(slug: 'airport_arrivals_by_origin_weekly')

      return unless airport_arrivals_by_origin.present?

      # category_1 is origin port
      # category_2 is destination port
      airport_arrivals_by_origin
        .indicator_values
        .group_by { |v| [v.category_1, v.category_2, v.year] }
        .each do |airports_year, arrivals|
          origin, destination, year = airports_year
          airport_total_destinations.indicator_values << IndicatorValue.new(
            region: arrivals.first.region,
            date: year.to_s,
            category_1: origin,
            category_2: destination,
            value: arrivals.sum(0.0, &:value) / arrivals.length
          )
        end
    end
  end
end
