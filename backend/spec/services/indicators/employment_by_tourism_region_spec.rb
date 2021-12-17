require 'rails_helper'

RSpec.describe Indicators::EmploymentByTourismRegion do
  describe 'generate' do
    before_all do
      @pr = create(:region, :province, name: 'province')

      @r1 = create(:region, name: 'tourism region 1', parent: @pr)
      @r2 = create(:region, name: 'tourism region 2', parent: @pr)

      Indicator.create(
        slug: 'tourism_employment_by_economic_region',
        indicator_values: [
          IndicatorValue.new(region: @r1, category_1: 'Economic region 1', date: '2020-01', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 1', date: '2020-02', value: 200),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 1', date: '2020-03', value: 50),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 2', date: '2020-01', value: 400),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 2', date: '2020-02', value: 200),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 2', date: '2020-03', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 3', date: '2020-01', value: 100),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 3', date: '2020-02', value: 200),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 3', date: '2020-03', value: 50),
          IndicatorValue.new(region: @r2, category_1: 'Economic region 4', date: '2020-01', value: 60),
          IndicatorValue.new(region: @r2, category_1: 'Economic region 4', date: '2020-02', value: 200),
          IndicatorValue.new(region: @r2, category_1: 'Economic region 4', date: '2020-03', value: 50)
        ]
      )
      Indicator.create(
        slug: 'total_employment_by_economic_region',
        indicator_values: [
          IndicatorValue.new(region: @r1, category_1: 'Economic region 1', date: '2020-01', value: 1000),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 1', date: '2020-02', value: 2000),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 1', date: '2020-03', value: 500),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 2', date: '2020-01', value: 4000),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 2', date: '2020-02', value: 2000),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 2', date: '2020-03', value: 1000),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 3', date: '2020-01', value: 1000),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 3', date: '2020-02', value: 2000),
          IndicatorValue.new(region: @r1, category_1: 'Economic region 3', date: '2020-03', value: 500),
          IndicatorValue.new(region: @r2, category_1: 'Economic region 4', date: '2020-01', value: 600),
          IndicatorValue.new(region: @r2, category_1: 'Economic region 4', date: '2020-02', value: 2000),
          IndicatorValue.new(region: @r2, category_1: 'Economic region 4', date: '2020-03', value: 500)
        ]
      )

      Indicators::EmploymentByTourismRegion.generate
    end

    describe 'tourism employment data' do
      it 'returns correct monthly values grouped by tourism region' do
        indicator = Indicator.find_by(slug: 'tourism_employment_by_tourism_region_monthly')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(6)

        expect(values).to include({region_id: @r1.id, date: '2020-01', value: 100 + 400 + 100})
        expect(values).to include({region_id: @r1.id, date: '2020-02', value: 200 + 200 + 200})
        expect(values).to include({region_id: @r1.id, date: '2020-03', value: 50 + 100 + 50})
        expect(values).to include({region_id: @r2.id, date: '2020-01', value: 60})
        expect(values).to include({region_id: @r2.id, date: '2020-02', value: 200})
        expect(values).to include({region_id: @r2.id, date: '2020-03', value: 50})
      end

      it 'returns correct annually values grouped by tourism region' do
        indicator = Indicator.find_by(slug: 'tourism_employment_by_tourism_region_annually')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(2)

        expect(values).to include({region_id: @r1.id, date: '2020', value: ((100 + 400 + 100 + 200 + 200 + 200 + 50 + 100 + 50) / 3.0).round})
        expect(values).to include({region_id: @r2.id, date: '2020', value: ((60 + 200 + 50) / 3.0).round})
      end
    end

    describe 'total_employment_data' do
      it 'returns correct monthly values grouped by tourism region' do
        indicator = Indicator.find_by(slug: 'total_employment_by_tourism_region_monthly')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(6)

        expect(values).to include({region_id: @r1.id, date: '2020-01', value: 1000 + 4000 + 1000})
        expect(values).to include({region_id: @r1.id, date: '2020-02', value: 2000 + 2000 + 2000})
        expect(values).to include({region_id: @r1.id, date: '2020-03', value: 500 + 1000 + 500})
        expect(values).to include({region_id: @r2.id, date: '2020-01', value: 600})
        expect(values).to include({region_id: @r2.id, date: '2020-02', value: 2000})
        expect(values).to include({region_id: @r2.id, date: '2020-03', value: 500})
      end

      it 'returns correct annually values grouped by tourism region' do
        indicator = Indicator.find_by(slug: 'total_employment_by_tourism_region_annually')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(2)

        expect(values).to include({region_id: @r1.id, date: '2020', value: ((1000 + 4000 + 1000 + 2000 + 2000 + 2000 + 500 + 1000 + 500) / 3.0).round})
        expect(values).to include({region_id: @r2.id, date: '2020', value: ((600 + 2000 + 500) / 3.0).round})
      end
    end

    describe 'tourism_to_total_percentage_data' do
      it 'returns correct monthly values grouped by tourism region' do
        indicator = Indicator.find_by(slug: 'tourism_to_total_employment_percentage_monthly')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(6)

        expect(values).to include({region_id: @r1.id, date: '2020-01', value: 10.0})
        expect(values).to include({region_id: @r1.id, date: '2020-02', value: 10.0})
        expect(values).to include({region_id: @r1.id, date: '2020-03', value: 10.0})
        expect(values).to include({region_id: @r2.id, date: '2020-01', value: 10.0})
        expect(values).to include({region_id: @r2.id, date: '2020-02', value: 10.0})
        expect(values).to include({region_id: @r2.id, date: '2020-03', value: 10.0})
      end

      it 'returns correct annually values grouped by tourism region' do
        indicator = Indicator.find_by(slug: 'tourism_to_total_employment_percentage_annually')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(2)
      end
    end
  end
end
