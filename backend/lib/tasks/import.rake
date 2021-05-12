require "#{Rails.root}/lib/timed_logger"

namespace :import do
  desc 'Reimport Organizations'
  task organizations: :environment do
    next if Rails.env.production?

    Organization.delete_all
    Region.delete_all
    BusinessType.delete_all

    file = File.open(Rails.root.join('db', 'csvs', 'organizations.csv'), 'r')

    TimedLogger.log('Import Organizations with Regions and Business Types') do
      CSVImport::Organizations.new(file).call
    end
  end
end
