require "#{Rails.root}/lib/timed_logger"

class ImportTasks
  include Rake::DSL

  def initialize
    namespace :import do
      desc 'Reimport All'
      task all: [:organizations, :indicators] do
        puts 'All data reimported!'
      end

      desc 'Reimport Organizations'
      task organizations: :environment do
        next if Rails.env.production? && !ENV['FORCE'].present?

        unless ENV['KEEP_OLD'].present?
          Organization.delete_all
          Region.delete_all
          BusinessType.delete_all
        end

        TimedLogger.log('Import Organizations with Regions and Business Types') do
          run_importer CSVImport::Organizations, csv_file('organizations.csv')
        end
      end

      task indicators: :environment do
        next if Rails.env.production? && !ENV['FORCE'].present?

        unless ENV['KEEP_OLD'].present?
          IndicatorValue.delete_all
          Indicator.delete_all
        end

        ActiveRecord::Base.connection.cache do
          TimedLogger.log('Import Indicator Values for Block 1') do
            run_importer CSVImport::IndicatorValues, csv_file('Block1_Tourism_Industry_and_Arrivals - EXPORT_CSV.csv')
          end

          TimedLogger.log('Import Indicator Values for Block 2') do
            run_importer CSVImport::IndicatorValues, csv_file('Block2_Accommodation_Hotel_Information - EXPORT_CSV.csv')
          end

          TimedLogger.log('Import Indicator Values for Block 4') do
            run_importer CSVImport::IndicatorValues, csv_file('Block4_Airport - EXPORT_CSV.csv')
          end

          TimedLogger.log('Create dynamic indicators') do
            Indicators::EstablishmentsByType.generate
            Indicators::DomesticVisits.generate
            Indicators::AirportTotalDestinations.generate
            Indicators::AirportTopAverageConnectionsPerWeek.generate
          end
        end
      end
    end
  end

  def run_importer(importer, file)
    service = importer.new(file)
    return if service.call

    puts 'Errors when calling importer'
    puts service.full_error_messages
  end

  def csv_file(file_name)
    File.open(Rails.root.join('db', 'csvs', file_name), 'r')
  end
end

ImportTasks.new
