require 'rails_helper'

describe CSVImport::Organizations do
  it 'should import data' do
    csv_content = <<-CSV
        Company Id,Name,Tourism Region,Tourism Sub-Region,Business Type,Business Sub-Type,Indigenous Tourism,Latitude,Longitude
        324323,Planet Bee Honey Farm & Meadery,Thompson Okanagan,North Okanagan,Activity / Attraction,FALSE,50.2632292,-119.3063629
        121222,La Maison Osoyoos Larose B&B,Thompson Okanagan,South Okanagan,Accommodation,Bed & Breakfast,TRUE,49.0463827,-119.4914925
    CSV

    service = CSVImport::Organizations.new(fixture_file('organizations.csv', content: csv_content))

    expect(service.call).to eq(true)
    expect(Organization.count).to eq(2)
    expect(Region.count).to eq(3)
    expect(BusinessType.count).to eq(4)
    expect(Region.find_by(name: 'North Okanagan').parent).to eq(Region.find_by(name: 'Thompson Okanagan'))
    expect(BusinessType.find_by(name: 'Bed & Breakfast').parent).to eq(BusinessType.find_by(name: 'Accommodation'))
  end
end
