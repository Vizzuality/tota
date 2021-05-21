require "#{Rails.root}/lib/timed_logger"

namespace :import do
  desc 'Reimport All'
  task all: [:organizations, :indicators] do
    puts 'All data reimported!'
  end

  desc 'Reimport Organizations'
  task organizations: :environment do
    next if Rails.env.production?

    unless ENV['KEEP_OLD'].present?
      Organization.delete_all
      Region.delete_all
      BusinessType.delete_all
    end

    TimedLogger.log('Import Organizations with Regions and Business Types') do
      CSVImport::Organizations.new(csv_file('organizations.csv')).call
    end
  end

  task indicators: :environment do
    next if Rails.env.production?

    unless ENV['KEEP_OLD'].present?
      IndicatorValue.delete_all
      Indicator.delete_all
    end

    TimedLogger.log('Import Indicator Values') do
      ActiveRecord::Base.connection.cache do
        CSVImport::IndicatorValues.new(csv_file('indicator_values.csv')).call
      end
    end
  end

  def csv_file(file_name)
    File.open(Rails.root.join('db', 'csvs', file_name), 'r')
  end
end
