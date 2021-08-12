module Indicators
  class AirportTotalDestinations
    include Singleton

    class << self
      delegate :generate, :regenerate, to: :instance
    end

    def regenerate
      Indicator.find_by(slug: 'airport_total_destinations')&.destroy
      generate
    end

    def generate
      airport_total_destinations = Indicator.create(slug: 'airport_total_destinations')
      airport_arrivals_by_origin = Indicator
        .find_by(slug: 'airport_arrivals_by_origin_weekly')
        .indicator_values

      airport_arrivals_by_origin.group_by { |v| [v.category_2, v.year] }.each do |airport_year, arrivals|
        airport, year = airport_year
        airport_total_destinations.indicator_values << IndicatorValue.new(
          region: arrivals.first.region,
          date: year.to_s,
          category_1: airport,
          value: arrivals.map(&:category_1).uniq.count
        )
      end
    end
  end
end
