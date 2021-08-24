require 'rails_helper'

RSpec.describe Indicators::DevelopmentFundsBySource do
  describe 'generate' do
    describe 'when no development funds exist' do
      subject { Indicators::DevelopmentFundsBySource.generate }

      it 'does not create any values' do
        expect { subject }.not_to change { IndicatorValue.count }
      end
    end

    describe 'when development funds do exist' do
      before :each do
        province = create(:region, name: 'Province', region_type: 'province')
        r1 = create(:region, name: 'Region 1', parent: province)
        r2 = create(:region, name: 'Region 2', parent: province)
        create(:development_fund, region: r1, key_funding_source: 'Source 1', funding_call_year: 2019)
        create(:development_fund, region: r1, key_funding_source: 'Source 1', funding_call_year: 2019)
        create(:development_fund, region: r1, key_funding_source: 'Source 2', funding_call_year: 2019)
        create(:development_fund, region: r1, key_funding_source: 'Source 2', funding_call_year: 2019)
        create(:development_fund, region: r2, key_funding_source: 'Source 1', funding_call_year: 2019)
        create(:development_fund, region: r2, key_funding_source: 'Source 2', funding_call_year: 2019)
        create(:development_fund, region: r2, key_funding_source: 'Source 2', funding_call_year: 2020)
      end

      subject { Indicators::DevelopmentFundsBySource.generate }

      it 'returns correct values' do
        expect { subject }.to change { IndicatorValue.count }
        values = Indicator.find_by(slug: 'development_funds_by_source').indicator_values
        values_json = values.map { |v| v.slice(:date, :category_1, :value, :region).symbolize_keys }

        expect(values_json).to contain_exactly(
          {
            date: '2019',
            region: 'Region 1',
            category_1: 'Source 1',
            value: 2
          },
          {
            date: '2019',
            region: 'Region 1',
            category_1: 'Source 2',
            value: 2
          },
          {
            date: '2019',
            region: 'Region 2',
            category_1: 'Source 1',
            value: 1
          },
          {
            date: '2019',
            region: 'Region 2',
            category_1: 'Source 2',
            value: 1
          },
          {
            date: '2019',
            region: 'Province',
            category_1: 'Source 1',
            value: 3
          },
          {
            date: '2019',
            region: 'Province',
            category_1: 'Source 2',
            value: 3
          },
          {
            date: '2020',
            region: 'Region 2',
            category_1: 'Source 2',
            value: 1
          },
          {
            date: '2020',
            region: 'Province',
            category_1: 'Source 2',
            value: 1
          }
        )
      end
    end
  end
end
