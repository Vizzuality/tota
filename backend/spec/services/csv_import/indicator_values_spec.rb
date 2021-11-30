require 'rails_helper'

describe CSVImport::IndicatorValues do
  before_all do
    @bc = create(:region, name: 'British Columbia')
    @to = create(:region, name: 'Thompson Okanagan')
  end

  describe 'errors' do
    it 'should return error if required column not provided' do
      csv_content = <<-CSV
        indicator_code,date,category_1,category_2,value
        visits_by_prizm_monthly,2019-3,British Columbia,Country & Western,8.031
      CSV

      service = CSVImport::IndicatorValues.new(fixture_file('indicator_values.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.errors.messages[:base]).to eq(['CSV missing header: Region'])
    end

    xit 'should return error for a row if data invalid' do
      allow_any_instance_of(Kernel).to receive(:warn) # suppress warning message

      csv_content = <<-CSV
        indicator_code,date,region,category_1,category_2,value
        visits_by_prizm_monthly,2019-3,Thompson Okanagan,British Columbia,Country & Western,8.031
        visits_by_prizm_monthly,2019-3,Thompson Okanagan,British Columbia,Suburban Sports,7.33
        visits_by_origin_province_monthly,2020-1,Thompson Okanagan,Manitoba,,
        visits_by_origin_province_monthly,2020-1,Thompson Okanagan,New Brunswick,,3344
      CSV

      service = CSVImport::IndicatorValues.new(fixture_file('indicator_values.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.full_error_messages).to eq("Error on row 3: Validation failed: Value can't be blank.")
    end
  end

  describe 'proper import' do
    it 'should import data' do
      service = CSVImport::IndicatorValues.new(fixture_file('csv/indicator_values_proper.csv'))

      service.call

      expect(service.errors.messages).to eq({})
      expect(Indicator.count).to eq(2)
      expect(IndicatorValue.count).to eq(4)

      values = Indicator
        .find_by(slug: 'visits_by_prizm_monthly')
        .indicator_values
        .map { |v| v.slice(:date, :region_id, :category_1, :category_2, :value).symbolize_keys }
      expect(values).to eq(
        [{
          date: '2019-3',
          region_id: @to.id,
          category_1: 'British Columbia',
          category_2: 'Country & Western',
          value: 8.031
        },
         {
           date: '2019-3',
           region_id: @to.id,
           category_1: 'British Columbia',
           category_2: 'Suburban Sports',
           value: 7.33
         }]
      )
    end
  end
end
