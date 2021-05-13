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
  end

  def fixture_file(filename, content: nil, content_type: 'text/csv')
    file_path = if content.present?
                  file_path = "#{Rails.root}/tmp/#{filename}"
                  File.open(file_path, 'w:UTF-8') do |f|
                    f.write(content)
                  end
                  file_path
                else
                  "#{Rails.root}/text/fixtures/files/#{filename}"
                end

    Rack::Test::UploadedFile.new(file_path, content_type)
  end
end
