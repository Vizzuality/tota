module Indicators
  class EmploymentByRegionAnnually
    include Singleton

    class << self
      delegate :generate, :regenerate, to: :instance
    end

    def regenerate
      Indicator.find_by(slug: 'tourism_employment_by_economic_region_annually')&.destroy
      Indicator.find_by(slug: 'total_employment_by_economic_region_annually')&.destroy
      generate
    end

    def generate
      generate_tourism_employment_data
      generate_total_employment_data
    end

    private

    def generate_tourism_employment_data
      employment_by_region_annually = Indicator.create(slug: 'tourism_employment_by_economic_region_annually')
      employment_by_region = Indicator.find_by(slug: 'tourism_employment_by_economic_region')

      generate_annual_average_indicator_values(employment_by_region_annually, employment_by_region)
    end

    def generate_total_employment_data
      employment_by_region_annually = Indicator.create(slug: 'total_employment_by_economic_region_annually')
      employment_by_region = Indicator.find_by(slug: 'total_employment_by_economic_region')

      generate_annual_average_indicator_values(employment_by_region_annually, employment_by_region)
    end

    def generate_annual_average_indicator_values(annual_indicator, indicator)
      return unless indicator.present?

      indicator
        .indicator_values
        .group_by { |v| [v.region_id, v.year] }
        .each do |region_year, values|
          region_id, year = region_year
          annual_indicator.indicator_values << IndicatorValue.new(
            region_id: region_id,
            date: year.to_s,
            value: (values.sum(0.0, &:value) / values.length).round
          )
        end
    end
  end
end
