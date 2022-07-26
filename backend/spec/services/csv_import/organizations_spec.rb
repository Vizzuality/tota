require 'rails_helper'

describe CSVImport::Organizations do
  describe 'errors' do
    it 'should return error if required column not provided' do
      csv_content = <<-CSV
        Company Id,Name of Business,website,Tourism Region,Tourism Sub-Region,Business Type 1,Business Type 2,Business Tags,Indigenous Tourism,Biosphere program member,Accessibility,Latitude,Longitude,Show on platform,Source
        324323,Planet Bee Honey Farm & Meadery,http://example.com,Thompson Okanagan,North Okanagan,Activity / Attraction,,"Tag1, Tag2",FALSE,FALSE,FALSE,50.2632292,-119.3063629,TRUE,TOTA members
        121222,La Maison Osoyoos Larose B&B,http://example2.com,Thompson Okanagan,South Okanagan,Accommodation,Bed & Breakfast,,TRUE,TRUE,TRUE,49.0463827,-119.4914925,TRUE, TOTA members
      CSV

      service = CSVImport::Organizations.new(fixture_file('organizations.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.errors.messages[:base]).to eq(['CSV missing header: Name of businessorganization'])
    end

    it 'should return error for a row if data invalid' do
      allow_any_instance_of(Kernel).to receive(:warn) # suppress warning message

      csv_content = <<-CSV
        Company Id,Name of Business/Organization,website,Tourism Region,Tourism Sub-Region,Business Type 1,Business Type 2,Business Tags,Indigenous Tourism,Biosphere program member,Accessibility,Latitude,Longitude,Show on platform,Source
        324323,Planet Bee Honey Farm & Meadery,http://example.com,Thompson Okanagan,North Okanagan,Activity / Attraction,,"Tag1, Tag2",FALSE,FALSE,FALSE,50.2632292,-119.3063629,TRUE,TOTA members
        121222,,http://example2.com,Thompson Okanagan,South Okanagan,Accommodation,Bed & Breakfast,,TRUE,TRUE,TRUE,49.0463827,-119.4914925,TRUE,TOTA members
      CSV

      service = CSVImport::Organizations.new(fixture_file('organizations.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.full_error_messages).to eq("Error on row 2: Validation failed: Name can't be blank.")
    end
  end

  describe 'proper import' do
    it 'should import data' do
      service = CSVImport::Organizations.new(fixture_file('csv/organizations_proper.csv'))

      service.call

      imported_json = organizations_hash(Organization.all).to_json

      expect(service.errors.messages).to eq({})
      expect(Organization.count).to eq(3)
      expect(Organization.visible.count).to eq(2)
      expect(Region.count).to eq(3)
      expect(BusinessType.count).to eq(3)
      expect(imported_json).to match_snapshot('csv_import/organizations')
      expect(Region.find_by(name: 'North Okanagan').parent).to eq(Region.find_by(name: 'Thompson Okanagan'))
    end
  end

  describe 'regional import' do
    let(:tourism_region_1) { create(:region, name: 'Region 1') }
    let(:tourism_subregion_1) { create(:region, name: 'SubRegion 1', parent: tourism_region_1, region_type: 'tourism_subregion') }
    let!(:organizations_region_1) { create_list(:organization, 3, region: tourism_subregion_1) }

    it 'does not destroy organizations for other tourism region' do
      service = CSVImport::Organizations.new(fixture_file('csv/organizations_proper.csv'))
      service.call

      expect(service.errors.messages).to eq({})
      expect(Organization.count).to eq(6)
      expect(Organization.where(region: tourism_subregion_1).count).to eq(3)
      expect(Region.count).to eq(5)

      # changing imported organization property and import again
      # that would just remove only organization from imported region
      org = Organization.find_by(name: 'Planet Bee Honey Farm & Meadery')
      org.update!(name: 'New name')

      service = CSVImport::Organizations.new(fixture_file('csv/organizations_proper.csv'))
      service.call

      org = Organization.find_by(name: 'Planet Bee Honey Farm & Meadery')

      expect(org).to be_present
      expect(service.errors.messages).to eq({})
      expect(Organization.count).to eq(6)
      expect(Organization.where(region: tourism_subregion_1).count).to eq(3)
      expect(Region.count).to eq(5)
    end
  end

  describe 'import exported' do
    let(:organizations) { create_list(:organization, 2) }

    it 'should work' do
      exported_csv = CSVExport::Organizations.new.export(organizations)
      exported = organizations_hash(Organization.all)

      service = CSVImport::Organizations.new(fixture_file('organizations.csv', content: exported_csv))
      service.call

      imported = organizations_hash(Organization.all)

      expect(service.errors.messages).to eq({})
      expect(Organization.count).to eq(2)
      expect(exported).to eq(imported)
    end
  end

  def organizations_hash(organizations)
    organizations.as_json(
      except: [:id, :created_at, :updated_at, :region_id, :business_type_1_id, :business_type_2_id],
      methods: [:region_name, :subregion_name],
      include: {business_type_1: {only: :name}, business_type_2: {only: :name}}
    )
  end
end
