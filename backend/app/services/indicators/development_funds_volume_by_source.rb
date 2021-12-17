module Indicators
  class DevelopmentFundsVolumeBySource < DynamicIndicator
    DEPENDS_ON = [].freeze

    attr_accessor :indicator

    def regenerate
      Indicator.find_by(slug: 'development_funds_volume_by_source')&.delete
      generate
    end

    def generate
      @indicator = create_indicator('development_funds_volume_by_source')
      values = []

      values.push(*append_by_source_year_region)
      values.push(*append_by_source_region_totals)
      values.push(*append_by_source_year_provinces)
      values.push(*append_by_source_province_totals)

      IndicatorValue.import! values, all_or_none: true
    end

    private

    def append_by_source_year_region
      DevelopmentFund
        .includes(:region)
        .where(region: {region_type: 'tourism_region'})
        .group(:key_funding_source, :funding_call_year, :region_id)
        .sum(:key_funding_amount)
        .map do |(source, year, region_id), value|
          build_value(date: year, category_1: source, region_id: region_id, value: value)
        end
    end

    def append_by_source_region_totals
      DevelopmentFund
        .includes(:region)
        .where(region: {region_type: 'tourism_region'})
        .group(:key_funding_source, :region_id)
        .sum(:key_funding_amount)
        .map do |(source, region_id), value|
          build_value(category_1: source, region_id: region_id, value: value)
        end
    end

    def append_by_source_year_provinces
      Region.province.flat_map do |province|
        DevelopmentFund
          .where(region_id: [province.id, *province.subregion_ids])
          .group(:key_funding_source, :funding_call_year)
          .sum(:key_funding_amount)
          .map do |(source, year), value|
            build_value(date: year, category_1: source, region_id: province.id, value: value)
          end
      end
    end

    def append_by_source_province_totals
      Region.province.flat_map do |province|
        DevelopmentFund
          .where(region_id: [province.id, *province.subregion_ids])
          .group(:key_funding_source)
          .sum(:key_funding_amount)
          .map do |source, value|
            build_value(category_1: source, region_id: province.id, value: value)
          end
      end
    end

    def build_value(args)
      indicator.indicator_values.build(args)
    end
  end
end
