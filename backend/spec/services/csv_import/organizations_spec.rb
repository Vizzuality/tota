require 'rails_helper'

describe CSVImport::Organizations do
  describe 'errors' do
    it 'should return error if required column not provided' do
      csv_content = <<-CSV
        Company Id,Name of Business,website,Tourism Region,Tourism Sub-Region,Business Type,Business Sub-Type,Indigenous Tourism,Biosphere program member,Accessibility,Latitude,Longitude
        324323,Planet Bee Honey Farm & Meadery,http://example.com,Thompson Okanagan,North Okanagan,Activity / Attraction,FALSE,FALSE,FALSE,50.2632292,-119.3063629
        121222,La Maison Osoyoos Larose B&B,http://example2.com,Thompson Okanagan,South Okanagan,Accommodation,Bed & Breakfast,TRUE,TRUE,TRUE,49.0463827,-119.4914925
      CSV

      service = CSVImport::Organizations.new(fixture_file('organizations.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.errors.messages[:base]).to eq(['CSV missing header: Name of businessorganization'])
    end

    it 'should return error for a row if data invalid' do
      allow_any_instance_of(Kernel).to receive(:warn) # suppress warning message

      csv_content = <<-CSV
        Company Id,Name of Business/Organization,website,Tourism Region,Tourism Sub-Region,Business Type,Business Sub-Type,Indigenous Tourism,Biosphere program member,Accessibility,Latitude,Longitude
        324323,Planet Bee Honey Farm & Meadery,http://example.com,Thompson Okanagan,North Okanagan,Activity / Attraction,FALSE,FALSE,FALSE,50.2632292,-119.3063629
        121222,,http://example2.com,Thompson Okanagan,South Okanagan,Accommodation,Bed & Breakfast,TRUE,TRUE,TRUE,49.0463827,-119.4914925
      CSV

      service = CSVImport::Organizations.new(fixture_file('organizations.csv', content: csv_content))

      expect(service.call).to eq(false)
      expect(service.full_error_messages).to eq("Error on row 2: Validation failed: Name can't be blank.")
    end
  end

  describe 'proper import' do
    it 'should import data' do
      csv_content = <<-CSV
        Company Id,Name of Business/Organization,website,Tourism Region,Tourism Sub-Region,Business Type,Business Sub-Type,Indigenous Tourism,Biosphere program member,Accessiblity,Latitude,Longitude
        324323,Planet Bee Honey Farm & Meadery,http://example.com,Thompson Okanagan,North Okanagan,Activity / Attraction,FALSE,FALSE,FALSE,50.2632292,-119.3063629
        121222,La Maison Osoyoos Larose B&B,http://example2.com,Thompson Okanagan,South Okanagan,Accommodation,Bed & Breakfast,TRUE,TRUE,TRUE,49.0463827,-119.4914925
      CSV

      service = CSVImport::Organizations.new(fixture_file('organizations.csv', content: csv_content))

      service.call

      expect(service.errors.messages).to eq({})
      expect(Organization.count).to eq(2)
      expect(Region.count).to eq(3)
      expect(BusinessType.count).to eq(4)
      expect(Region.find_by(name: 'North Okanagan').parent).to eq(Region.find_by(name: 'Thompson Okanagan'))
      expect(BusinessType.find_by(name: 'Bed & Breakfast').parent).to eq(BusinessType.find_by(name: 'Accommodation'))
    end
  end
end
