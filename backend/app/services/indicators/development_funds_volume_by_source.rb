module Indicators
  class DevelopmentFundsVolumeBySource
    include Singleton

    class << self
      delegate :generate, to: :instance
    end

    def generate
      indicator = Indicator.create(slug: 'development_funds_volume_by_source')
      values = []

      by_source_year_region = DevelopmentFund
        .group(:key_funding_source, :funding_call_year, :region_id)
        .sum(:key_funding_amount)
      by_source_year_region.each do |key, value|
        source, year, region_id = key
        values << IndicatorValue.new(
          indicator: indicator,
          date: year,
          category_1: source,
          region: Region.find(region_id).name, # TODO: change this
          value: value
        )
      end
      Region.province.each do |province|
        by_source_year = DevelopmentFund
          .where(region_id: [province.id, *province.subregion_ids])
          .group(:key_funding_source, :funding_call_year)
          .sum(:key_funding_amount)
        by_source_year.each do |key, value|
          source, year = key
          values << IndicatorValue.new(
            indicator: indicator,
            date: year,
            category_1: source,
            region: province.name,
            value: value
          )
        end
      end

      IndicatorValue.import! values, all_or_none: true
    end
  end
end
