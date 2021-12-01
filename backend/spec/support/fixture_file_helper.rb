module FixtureFileHelper
  def fixture_file(filename, content: nil, content_type: 'text/csv')
    file_path = if content.present?
                  file_path = "#{Rails.root}/tmp/#{filename}"
                  File.open(file_path, 'w:UTF-8') do |f|
                    f.write(content)
                  end
                  file_path
                else
                  "#{Rails.root}/spec/fixtures/files/#{filename}"
                end

    Rack::Test::UploadedFile.new(file_path, content_type)
  end
end
