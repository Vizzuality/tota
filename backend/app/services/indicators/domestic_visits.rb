module Indicators
  class DomesticVisits
    include Singleton

    class << self
      delegate :generate, to: :instance
    end

    def generate
      domestic_visits_percentage_monthly = Indicator.create(slug: 'domestic_visits_percentage_monthly')
      domestic_visits_percentage_quarterly = Indicator.create(slug: 'domestic_visits_percentage_quarterly')
      domestic_visits_peak_lowest_month_ratio = Indicator.create(slug: 'domestic_visits_peak_lowest_month_ratio')

      visits_monthly = Indicator
        .find_by(slug: 'visits_by_origin_country_monthly')
        .indicator_values
        .where(category_1: 'Canada')
      visits_quarterly = Indicator
        .find_by(slug: 'visits_by_origin_country_quarterly')
        .indicator_values
        .where(category_1: 'Canada')

      visits_monthly.group_by { |v| [v.region, v.year] }.each do |_region_year, visits|
        all = visits.sum(&:value)
        peak = visits.max_by(&:value)
        lowest = visits.min_by(&:value)
        visits.each do |visit|
          domestic_visits_percentage_monthly.indicator_values << IndicatorValue.new(
            **visit.slice(:region, :date),
            value: visit.value / all.to_f
          )
        end
        domestic_visits_peak_lowest_month_ratio.indicator_values << IndicatorValue.new(
          region: visits[0].region,
          value: peak.value / lowest.value.to_f,
          date: visits[0].year.to_s,
          category_1: peak.date,
          category_2: lowest.date
        )
      end

      visits_quarterly.group_by { |v| [v.region, v.year] }.each do |_region_year, visits|
        all = visits.sum(&:value)
        visits.each do |visit|
          domestic_visits_percentage_quarterly.indicator_values << IndicatorValue.new(
            **visit.slice(:region, :date),
            value: visit.value / all.to_f
          )
        end
      end
    end
  end
end
