module Indicators
  class EmploymentByTourismRegion < DynamicIndicator
    DEPENDS_ON = %w[
      tourism_employment_by_economic_region
      total_employment_by_economic_region
    ].freeze

    def regenerate
      Indicator.find_by(slug: 'tourism_employment_by_tourism_region_annually')&.delete
      Indicator.find_by(slug: 'tourism_employment_by_tourism_region_monthly')&.delete
      Indicator.find_by(slug: 'total_employment_by_tourism_region_annually')&.delete
      Indicator.find_by(slug: 'total_employment_by_tourism_region_monthly')&.delete
      Indicator.find_by(slug: 'tourism_to_total_employment_percentage_annually')&.delete
      Indicator.find_by(slug: 'tourism_to_total_employment_percentage_monthly')&.delete
      generate
    end

    def generate
      generate_tourism_employment_data
      generate_total_employment_data
      generate_tourism_to_total_percentage_data
    end

    private

    def generate_tourism_employment_data
      employment_by_region_monthly = create_indicator('tourism_employment_by_tourism_region_monthly')
      employment_by_region_annually = create_indicator('tourism_employment_by_tourism_region_annually')
      employment_by_region = Indicator.find_by(slug: 'tourism_employment_by_economic_region')

      generate_tourism_region_indicator_values(employment_by_region_monthly, employment_by_region)
      generate_annual_average_indicator_values(employment_by_region_annually, employment_by_region_monthly)
    end

    def generate_total_employment_data
      employment_by_region_monthly = create_indicator('total_employment_by_tourism_region_monthly')
      employment_by_region_annually = create_indicator('total_employment_by_tourism_region_annually')
      employment_by_region = Indicator.find_by(slug: 'total_employment_by_economic_region')

      generate_tourism_region_indicator_values(employment_by_region_monthly, employment_by_region)
      generate_annual_average_indicator_values(employment_by_region_annually, employment_by_region_monthly)
    end

    def generate_tourism_to_total_percentage_data
      monthly = create_indicator('tourism_to_total_employment_percentage_monthly')
      annually = create_indicator('tourism_to_total_employment_percentage_annually')

      total_monthly = Indicator.find_by(slug: 'total_employment_by_tourism_region_monthly')
      tourism_monthly = Indicator.find_by(slug: 'tourism_employment_by_tourism_region_monthly')

      total_annually = Indicator.find_by(slug: 'total_employment_by_tourism_region_annually')
      tourism_annually = Indicator.find_by(slug: 'tourism_employment_by_tourism_region_annually')

      generate_percentage_by_region(monthly, total_monthly, tourism_monthly)
      generate_percentage_by_region(annually, total_annually, tourism_annually)
    end

    def generate_tourism_region_indicator_values(monthly_indicator, indicator)
      return unless indicator.present?

      values_to_add = indicator
        .indicator_values
        .group_by { |v| [v.region_id, v.date] }
        .map do |(region_id, date), values|
          IndicatorValue.new(
            indicator: monthly_indicator,
            region_id: region_id,
            date: date,
            value: values.sum(0.0, &:value)
          )
        end

      IndicatorValue.import! values_to_add, all_or_none: true
    end

    def generate_annual_average_indicator_values(annual_indicator, indicator)
      return unless indicator.present?

      values_to_add = indicator
        .indicator_values
        .group_by { |v| [v.region_id, v.year] }
        .map do |(region_id, year), values|
          IndicatorValue.new(
            indicator: annual_indicator,
            region_id: region_id,
            date: year.to_s,
            value: (values.sum(0.0, &:value) / values.length).round
          )
        end

      IndicatorValue.import! values_to_add, all_or_none: true
    end

    def generate_percentage_by_region(indicator, total, tourism)
      return unless total.present?
      return unless tourism.present?

      values_to_add = total
        .indicator_values
        .filter_map do |total_value|
          tourism_value = tourism.indicator_values.find do |iv|
            iv.region_id == total_value.region_id && iv.date == total_value.date
          end
          next unless tourism_value.present?

          IndicatorValue.new(
            indicator: indicator,
            region_id: total_value.region_id,
            date: total_value.date,
            value: ((tourism_value.value / total_value.value) * 100).round(2)
          )
        end

      IndicatorValue.import! values_to_add, all_or_none: true
    end
  end
end
