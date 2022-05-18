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

    it 'should return error for a row if data invalid' do
      allow_any_instance_of(Kernel).to receive(:warn) # suppress warning message

      csv_content = <<-CSV
        indicator_code,date,region,category_1,category_2,value
        visits_by_prizm_monthly,2019-3,Thompson Okanagan,British Columbia,Country & Western,8.031
        visits_by_prizm_monthly,2019-3,Thompson Okanagan,British Columbia,Suburban Sports,7.33
        visits_by_origin_province_monthly,2020-1,Super Region,Manitoba,,333
        visits_by_origin_province_monthly,2020-1,Thompson Okanagan,New Brunswick,,3344
      CSV

      service = CSVImport::IndicatorValues.new(fixture_file('indicator_values.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.full_error_messages).to eq('Error on row 3: Cannot find region with name Super Region.')
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

  describe 'import exported' do
    before do
      r1 = create(:region, name: 'Thompson')
      create(
        :indicator,
        slug: 'visits_by_origin',
        indicator_values: [
          build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: r1),
          build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: r1)
        ]
      )
      create(
        :indicator,
        slug: 'stays_by_origin',
        indicator_values: [
          build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '11111', region: r1),
          build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: r1)
        ]
      )
    end

    it 'should work' do
      # we will export and import only 1 indicator stays_by_origin
      indicator = Indicator.find_by(slug: 'stays_by_origin')
      values = IndicatorValue.where(indicator: indicator)
      exported_csv = CSVExport::IndicatorValues.new.export(values)
      exported = indicator_values_hash(values)

      service = CSVImport::IndicatorValues.new(fixture_file('indicator_values.csv', content: exported_csv))
      service.call

      indicator = Indicator.find_by(slug: 'stays_by_origin')
      values = IndicatorValue.where(indicator: indicator)
      imported = indicator_values_hash(values)

      expect(service.errors.messages).to eq({})
      expect(IndicatorValue.count).to eq(4)
      expect(exported).to eq(imported)
    end
  end

  def indicator_values_hash(values)
    values.as_json(
      except: [:id, :created_at, :updated_at, :indicator_id],
      include: {indicator: {only: [:slug]}}
    )
  end
end
