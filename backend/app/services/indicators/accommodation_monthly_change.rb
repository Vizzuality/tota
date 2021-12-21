module Indicators
  class AccommodationMonthlyChange < DynamicIndicator
    DEPENDS_ON = %w[
      adr_month
      occupancy_month
      revpar_month
    ].freeze

    def regenerate
      Indicator.find_by(slug: 'adr_change_month')&.delete
      Indicator.find_by(slug: 'occupancy_change_month')&.delete
      Indicator.find_by(slug: 'revpar_change_month')&.delete
      generate
    end

    def generate
      create_change_indicator('adr_month', 'adr_change_month')
      create_change_indicator('occupancy_month', 'occupancy_change_month')
      create_change_indicator('revpar_month', 'revpar_change_month')
    end

    private

    def create_change_indicator(indicator_slug, change_indicator_slug)
      change_indicator = create_indicator(change_indicator_slug)
      indicator = Indicator.find_by(slug: indicator_slug)
      return unless indicator.present?

      values = indicator.indicator_values.order(:region_id, :date).to_a
      values_to_add = []

      values.each do |v|
        prev_year_date = v.date.gsub(v.year.to_s, (v.year.to_i - 1).to_s)
        prev_year_data = values.find { |vv| vv.region_id == v.region_id && vv.date == prev_year_date }
        next if prev_year_data.nil?

        values_to_add << change_indicator.indicator_values.build(
          region_id: v.region_id,
          date: v.date,
          value: (((v.value / prev_year_data.value.to_f) - 1) * 100).round(2)
        )
      end

      IndicatorValue.import! values_to_add, all_or_none: true
    end
  end
end
