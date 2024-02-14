require 'rails_helper'

RSpec.describe Indicators::AccommodationMonthlyChange do
  describe 'generate' do
    before_all do
      @r1 = create(:region, name: 'tourism region 1')
      @r2 = create(:region, name: 'tourism region 2')

      Indicator.create(
        slug: 'revpar_month',
        indicator_values: [
          IndicatorValue.new(region: @r1, date: '2020-01', value: 20.5),
          IndicatorValue.new(region: @r1, date: '2020-02', value: 40.5),
          IndicatorValue.new(region: @r1, date: '2020-03', value: 50.34),
          IndicatorValue.new(region: @r1, date: '2021-01', value: 1.23 * 20.5),
          IndicatorValue.new(region: @r1, date: '2021-02', value: 1.345 * 40.5),
          IndicatorValue.new(region: @r1, date: '2021-03', value: 0.93 * 50.34),
          IndicatorValue.new(region: @r2, date: '2020-01', value: 50.5),
          IndicatorValue.new(region: @r2, date: '2020-02', value: 60.5),
          IndicatorValue.new(region: @r2, date: '2020-03', value: 100),
          IndicatorValue.new(region: @r2, date: '2021-01', value: 1.23 * 50.5),
          IndicatorValue.new(region: @r2, date: '2021-02', value: 1.445 * 60.5),
          IndicatorValue.new(region: @r2, date: '2021-03', value: 0.45 * 100)
        ]
      )

      Indicators::AccommodationMonthlyChange.generate
    end

    describe 'revpar_month' do
      it 'returns correct monthly change values' do
        indicator = Indicator.find_by(slug: 'revpar_change_month')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(6)

        expect(values).to include({region_id: @r1.id, date: '2021-01', value: 23})
        expect(values).to include({region_id: @r1.id, date: '2021-02', value: 34.5})
        expect(values).to include({region_id: @r1.id, date: '2021-03', value: -7})
        expect(values).to include({region_id: @r2.id, date: '2021-01', value: 23})
        expect(values).to include({region_id: @r2.id, date: '2021-02', value: 44.5})
        expect(values).to include({region_id: @r2.id, date: '2021-03', value: -55})
      end
    end

    describe 'occupancy_month' do
      it 'creates change indicator' do
        indicator = Indicator.find_by(slug: 'occupancy_change_month')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.present?).to be(true)
        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(0)
      end
    end

    describe 'adr_month' do
      it 'creates change indicator' do
        indicator = Indicator.find_by(slug: 'adr_change_month')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.present?).to be(true)
        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(0)
      end
    end

    describe 'adna_adr_month' do
      it 'creates change indicator' do
        indicator = Indicator.find_by(slug: 'adna_adr_change_month')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.present?).to be(true)
        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(0)
      end
    end

    describe 'adna_occupancy_month' do
      it 'creates change indicator' do
        indicator = Indicator.find_by(slug: 'adna_occupancy_change_month')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.present?).to be(true)
        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(0)
      end
    end

    describe 'adna_revpar_month' do
      it 'creates change indicator' do
        indicator = Indicator.find_by(slug: 'adna_revpar_change_month')
        values = indicator.indicator_values.map { |v| v.slice(:region_id, :date, :value).symbolize_keys }

        expect(indicator.present?).to be(true)
        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(0)
      end
    end
  end
end
