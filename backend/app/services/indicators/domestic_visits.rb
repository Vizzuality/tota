module Indicators
  class DomesticVisits < DynamicIndicator
    DEPENDS_ON = %w[
      visits_by_origin_country_monthly
      visits_by_origin_country_quarterly
    ].freeze

    def regenerate
      Indicator.find_by(slug: 'domestic_visits_percentage_monthly')&.delete
      Indicator.find_by(slug: 'domestic_visits_percentage_quarterly')&.delete
      Indicator.find_by(slug: 'domestic_visits_peak_lowest_month_ratio')&.delete
      generate
    end

    def generate
      domestic_visits_percentage_monthly = create_indicator('domestic_visits_percentage_monthly')
      domestic_visits_percentage_quarterly = create_indicator('domestic_visits_percentage_quarterly')
      domestic_visits_peak_lowest_month_ratio = create_indicator('domestic_visits_peak_lowest_month_ratio')

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
            value: (visit.value / all.to_f).round(6)
          )
        end
        domestic_visits_peak_lowest_month_ratio.indicator_values << IndicatorValue.new(
          region: visits[0].region,
          value: (peak.value / lowest.value.to_f).round(6),
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
            value: (visit.value / all.to_f).round(6)
          )
        end
      end
    end
  end
end
