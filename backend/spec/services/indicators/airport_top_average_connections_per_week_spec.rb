require 'rails_helper'

RSpec.describe Indicators::AirportTopAverageConnectionsPerWeek do
  describe 'generate' do
    describe 'when airport_arrivals_by_origin_weekly does not exist' do
      subject { Indicators::AirportTopAverageConnectionsPerWeek.generate }

      it 'does not create any values' do
        expect { subject }.not_to change { IndicatorValue.count }
      end
    end

    describe 'when airport_arrivals_by_origin_weekly does exists' do
      before :each do
        Indicator.create(
          slug: 'airport_arrivals_by_origin_weekly',
          indicator_values: [
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'JFK', date: '2020-01', value: 10),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'JFK', date: '2020-02', value: 20),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'JFK', date: '2020-03', value: 30),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'JFK', date: '2020-04', value: 10),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'JFK', date: '2020-05', value: 10),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'JFK', date: '2020-06', value: 10),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAB', category_2: 'JFK', date: '2021-01', value: 10),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAB', category_2: 'JFK', date: '2021-02', value: 20),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'JFK', date: '2021-03', value: 50),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'LAX', date: '2020-01', value: 60),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAB', category_2: 'LAX', date: '2020-02', value: 20),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'LAX', date: '2020-03', value: 50),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAB', category_2: 'LAX', date: '2020-03', value: 50),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'LAX', date: '2020-04', value: 10),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'LAX', date: '2020-05', value: 20),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'LAX', date: '2020-06', value: 40),
            IndicatorValue.new(region: 'Region 1', category_1: 'AAA', category_2: 'KTW', date: '2021-01', value: 10),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'KTW', date: '2021-02', value: 20),
            IndicatorValue.new(region: 'Region 1', category_1: 'KLM', category_2: 'KTW', date: '2021-03', value: 50)
          ]
        )
      end

      subject { Indicators::AirportTopAverageConnectionsPerWeek.generate }

      it 'returns correct values' do
        expect { subject }.to change { IndicatorValue.count }
        values = Indicator.find_by(slug: 'airport_top_average_connections_per_week').indicator_values.where(region: 'Region 1')
        values_json = values.map { |v| v.slice(:date, :category_1, :category_2, :value).symbolize_keys }

        expect(values_json).to contain_exactly(
          {
            date: '2020',
            category_1: 'KLM',
            category_2: 'JFK',
            value: (10 + 20 + 10 + 10) / 4.0
          },
          {
            date: '2020',
            category_1: 'AAA',
            category_2: 'JFK',
            value: (30 + 10) / 2.0
          },
          {
            date: '2021',
            category_1: 'AAB',
            category_2: 'JFK',
            value: (10 + 20) / 2.0
          },
          {
            date: '2021',
            category_1: 'KLM',
            category_2: 'JFK',
            value: 50 / 1.0
          },
          {
            date: '2020',
            category_1: 'KLM',
            category_2: 'LAX',
            value: (10 + 20) / 2.0
          },
          {
            date: '2020',
            category_1: 'AAA',
            category_2: 'LAX',
            value: (60 + 50 + 40) / 3.0
          },
          {
            date: '2020',
            category_1: 'AAB',
            category_2: 'LAX',
            value: (20 + 50) / 2.0
          },
          {
            date: '2021',
            category_1: 'AAA',
            category_2: 'KTW',
            value: 10 / 1.0
          },
          {
            date: '2021',
            category_1: 'KLM',
            category_2: 'KTW',
            value: (20 + 50) / 2.0
          }
        )
      end
    end
  end
end
