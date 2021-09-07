module Indicators
  class DevelopmentFundsBySource
    include Singleton

    attr_accessor :indicator

    class << self
      delegate :generate, to: :instance
    end

    def generate
      @indicator = Indicator.create(slug: 'development_funds_by_source')
      values = []

      values.push(*append_by_source_year_region)
      values.push(*append_by_source_region_totals)
      values.push(*append_by_source_year_provinces)
      values.push(*append_by_source_province_totals)

      IndicatorValue.import! values, all_or_none: true
    end

    private

    def append_by_source_year_region
      by_source_year_region = DevelopmentFund.group(:key_funding_source, :funding_call_year, :region_id).count
      by_source_year_region.map do |key, value|
        source, year, region_id = key
        IndicatorValue.new(
          indicator: indicator,
          date: year,
          category_1: source,
          region_id: region_id,
          value: value
        )
      end
    end

    def append_by_source_region_totals
      by_source_region = DevelopmentFund.group(:key_funding_source, :region_id).count
      by_source_region.map do |key, value|
        source, region_id = key
        IndicatorValue.new(
          indicator: indicator,
          category_1: source,
          region_id: region_id,
          value: value
        )
      end
    end

    def append_by_source_year_provinces
      Region.province.flat_map do |province|
        by_source_year = DevelopmentFund
          .where(region_id: [province.id, *province.subregion_ids])
          .group(:key_funding_source, :funding_call_year)
          .count
        by_source_year.map do |key, value|
          source, year = key
          IndicatorValue.new(
            indicator: indicator,
            date: year,
            category_1: source,
            region_id: province.id,
            value: value
          )
        end
      end
    end

    def append_by_source_province_totals
      Region.province.flat_map do |province|
        by_source = DevelopmentFund
          .where(region_id: [province.id, *province.subregion_ids])
          .group(:key_funding_source)
          .count
        by_source.map do |source, value|
          IndicatorValue.new(
            indicator: indicator,
            category_1: source,
            region_id: province.id,
            value: value
          )
        end
      end
    end
  end
end
