require 'rails_helper'

RSpec.describe Indicators::DomesticVisits do
  describe 'generate' do
    before_all do
      @r1 = create(:region, name: 'Region 1')
      @r2 = create(:region, name: 'Region 2')

      Indicator.create(
        slug: 'visits_by_origin_country_monthly',
        indicator_values: [
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-01', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-02', value: 200),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-03', value: 50),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-04', value: 400),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-05', value: 200),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-06', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2021-01', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2021-02', value: 200),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2021-03', value: 50),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-01', value: 60),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-02', value: 200),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-03', value: 50),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-04', value: 100),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-05', value: 200),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-06', value: 600),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2021-01', value: 100),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2021-02', value: 200),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2021-03', value: 50)
        ]
      )
      Indicator.create(
        slug: 'visits_by_origin_country_quarterly',
        indicator_values: [
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-Q1', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-Q2', value: 200),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-Q3', value: 50),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2020-Q4', value: 400),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2021-Q1', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Canada', date: '2021-Q2', value: 200),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-Q1', value: 60),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-Q2', value: 200),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-Q3', value: 50),
          IndicatorValue.new(region: @r2, category_1: 'Canada', date: '2020-Q4', value: 100)
        ]
      )

      Indicators::DomesticVisits.generate
    end

    describe 'domestic_visits_percentage_monthly' do
      it 'returns correct values' do
        indicator = Indicator.find_by(slug: 'domestic_visits_percentage_monthly')
        values = indicator.indicator_values.map { |v| v.slice(:region, :date, :value).symbolize_keys }
        visits = Indicator.find_by(slug: 'visits_by_origin_country_monthly').indicator_values
        region1_2020_total = visits.select { |v| v.region == @r1 && v.year == 2020 }.sum(&:value)
        region1_2021_total = visits.select { |v| v.region == @r1 && v.year == 2021 }.sum(&:value)
        region2_2020_total = visits.select { |v| v.region == @r2 && v.year == 2020 }.sum(&:value)
        region2_2021_total = visits.select { |v| v.region == @r2 && v.year == 2021 }.sum(&:value)

        expect(values).to include({region: @r1, date: '2020-01', value: (100 / region1_2020_total).round(6)})
        expect(values).to include({region: @r1, date: '2021-01', value: (100 / region1_2021_total).round(6)})
        expect(values).to include({region: @r2, date: '2020-06', value: (600 / region2_2020_total).round(6)})
        expect(values).to include({region: @r2, date: '2021-03', value: (50 / region2_2021_total).round(6)})
      end
    end

    describe 'domestic_visits_percentage_quarterly' do
      it 'returns correct values' do
        indicator = Indicator.find_by(slug: 'domestic_visits_percentage_quarterly')
        values = indicator.indicator_values.map { |v| v.slice(:region, :date, :value).symbolize_keys }
        visits = Indicator.find_by(slug: 'visits_by_origin_country_quarterly').indicator_values
        region1_2020_total = visits.select { |v| v.region == @r1 && v.year == 2020 }.sum(&:value)
        region1_2021_total = visits.select { |v| v.region == @r1 && v.year == 2021 }.sum(&:value)
        region2_2020_total = visits.select { |v| v.region == @r2 && v.year == 2020 }.sum(&:value)

        expect(values).to include({region: @r1, date: '2020-Q1', value: (100 / region1_2020_total).round(6)})
        expect(values).to include({region: @r1, date: '2021-Q2', value: (200 / region1_2021_total).round(6)})
        expect(values).to include({region: @r2, date: '2020-Q3', value: (50 / region2_2020_total).round(6)})
      end
    end

    describe 'domestic_visits_peak_lowest_month_ratio' do
      it 'returns correct values' do
        indicator = Indicator.find_by(slug: 'domestic_visits_peak_lowest_month_ratio')
        values = indicator.indicator_values.map { |v| v.slice(:region, :date, :category_1, :category_2, :value).symbolize_keys }

        expect(values).to include(
          {region: @r1, date: '2020', category_1: '2020-04', category_2: '2020-03', value: 400 / 50.to_f}
        )
        expect(values).to include(
          {region: @r1, date: '2021', category_1: '2021-02', category_2: '2021-03', value: 200 / 50.to_f}
        )
        expect(values).to include(
          {region: @r2, date: '2020', category_1: '2020-06', category_2: '2020-03', value: 600 / 50.to_f}
        )
      end
    end
  end
end
