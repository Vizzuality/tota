require 'rails_helper'
require 'bigdecimal/util'

describe CSVImport::DevelopmentFunds do
  describe 'errors' do
    it 'should return error if required column not provided' do
      csv_content = <<-CSV
        Project Title,Project Description,Recipient,Tourism region,Location,Latitude,Longitude,Categories / Tags,Scope,Planning Area,Second Planning Area,Total Project Cost,Key Funding Amount,Key Funding Source,Funding Subtype,Funding call (year),Funding call (month),Project Status
        Some title,Some Description,Recipient,Thompson Okanagan,Location,49.0463827,-119.4914925,"Cat1, Cat2, Cat3","Test scope","Test planning area","Test planning area2",22223,3333,Source,Funding Subtype,2020,May,Status
      CSV

      service = CSVImport::DevelopmentFunds.new(fixture_file('development_funds.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.errors.messages[:base]).to eq(['CSV missing header: Lead organization'])
    end

    it 'should return error for a row if data invalid' do
      allow_any_instance_of(Kernel).to receive(:warn) # suppress warning message

      csv_content = <<-CSV
        Project Title,Project Description,Recipient,Lead Organization,Tourism region,Location,Latitude,Longitude,Categories / Tags,Scope,Planning Area,Second Planning Area,Total Project Cost,Key Funding Amount,Key Funding Source,Funding Subtype,Funding call (year),Funding call (month),Project Status
        ,Some Description,Recipient,Organization,Thompson Okanagan,Location,49.046383,-119.491493,"Cat1, Cat2, Cat3","Test scope","Test planning area","Test planning area2",22223,3333,Source,Funding Subtype,2020,May,Status
      CSV

      service = CSVImport::DevelopmentFunds.new(fixture_file('development_funds.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.full_error_messages).to eq("Error on row 1: Validation failed: Region must exist, Project title can't be blank.")
    end
  end

  describe 'proper import' do
    it 'should import data' do
      create(:region, name: 'Thompson Okanagan')
      service = CSVImport::DevelopmentFunds.new(fixture_file('csv/development_funds_proper.csv'))

      service.call

      fund = DevelopmentFund.last

      expect(service.full_error_messages).to be_blank
      expect(DevelopmentFund.count).to eq(1)
      expect(Region.count).to eq(1)
      expect(fund.attributes.symbolize_keys.except(:id, :updated_at, :created_at)).to eq(
        {
          project_title: 'Some title',
          project_description: 'Some Description',
          region_id: Region.first.id,
          recipient: 'Recipient',
          lead_organization: 'Organization',
          location: 'Location',
          latitude: BigDecimal('49.046383'),
          longitude: BigDecimal('-119.491493'),
          categories: %w(Cat1 Cat2 Cat3),
          scope: 'Test scope',
          planning_area: 'Test planning area',
          second_planning_area: 'Test planning area2',
          total_project_cost: 22_223.to_f,
          key_funding_amount: 3333.to_f,
          key_funding_source: 'Source',
          funding_subtype: 'Funding Subtype',
          project_status: 'Status',
          funding_call_year: 2020,
          funding_call_month: 'May'
        }
      )
    end
  end

  describe 'import exported' do
    let(:development_funds) { create_list(:development_fund, 2) }

    it 'should work' do
      exported_csv = CSVExport::DevelopmentFunds.new.export(development_funds)
      exported = development_funds_hash(DevelopmentFund.all)

      service = CSVImport::DevelopmentFunds.new(fixture_file('development_funds.csv', content: exported_csv))
      service.call

      imported = development_funds_hash(DevelopmentFund.all)

      expect(service.errors.messages).to eq({})
      expect(DevelopmentFund.count).to eq(2)
      expect(exported).to eq(imported)
    end
  end

  def development_funds_hash(funds)
    funds.as_json(except: [:id, :updated_at, :created_at])
  end
end
