require 'rails_helper'

RSpec.describe Indicators::AirportTotalDestinations do
  describe 'generate' do
    describe 'when airport_arrivals_by_origin_weekly does not exist' do
      subject { Indicators::AirportTotalDestinations.generate }

      it 'does not create any values' do
        expect { subject }.not_to change { IndicatorValue.count }
      end
    end

    describe 'when airport_arrivals_by_origin_weekly does exists' do
      before :each do
        Indicator.create(
          slug: 'airport_arrivals_by_origin_weekly',
          indicator_values: [
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'JFK', date: '2020-01', value: 3),
            IndicatorValue.new(region: 'Region 1', category_1: 'YLW', category_2: 'JFK', date: '2020-02', value: 2),
            IndicatorValue.new(region: 'Region 1', category_1: 'ABC', category_2: 'JFK', date: '2020-03', value: 3),
            IndicatorValue.new(region: 'Region 1', category_1: 'SCD', category_2: 'JFK', date: '2020-04', value: 4),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'JFK', date: '2020-05', value: 2),
            IndicatorValue.new(region: 'Region 1', category_1: 'YLW', category_2: 'JFK', date: '2020-06', value: 100),
            IndicatorValue.new(region: 'Region 1', category_1: 'ABC', category_2: 'JFK', date: '2021-01', value: 100),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'JFK', date: '2021-02', value: 200),
            IndicatorValue.new(region: 'Region 1', category_1: 'SCD', category_2: 'JFK', date: '2021-03', value: 50),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'LAX', date: '2020-01', value: 60),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAB', category_2: 'LAX', date: '2020-02', value: 200),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAC', category_2: 'LAX', date: '2020-03', value: 50),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'LAX', date: '2020-03', value: 50),
            IndicatorValue.new(region: 'Region 1', category_1: 'CAD', category_2: 'LAX', date: '2020-04', value: 100),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'LAX', date: '2020-05', value: 200),
            IndicatorValue.new(region: 'Region 1', category_1: 'CAD', category_2: 'LAX', date: '2020-06', value: 600),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'KTW', date: '2021-01', value: 100),
            IndicatorValue.new(region: 'Region 1', category_1: 'ACD', category_2: 'KTW', date: '2021-02', value: 200),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'KTW', date: '2021-03', value: 50)
          ]
        )
      end

      subject { Indicators::AirportTotalDestinations.generate }

      it 'returns correct values' do
        expect { subject }.to change { IndicatorValue.count }
        values = Indicator.find_by(slug: 'airport_total_destinations').indicator_values.where(region: 'Region 1')
        values_json = values.map { |v| v.slice(:date, :category_2, :value).symbolize_keys }

        expect(values_json).to contain_exactly(
          {
            date: '2020',
            category_2: 'JFK',
            value: 4
          },
          {
            date: '2021',
            category_2: 'JFK',
            value: 3
          },
          {
            date: '2020',
            category_2: 'LAX',
            value: 4
          },
          {
            date: '2021',
            category_2: 'KTW',
            value: 2
          }
        )
      end
    end
  end
end
