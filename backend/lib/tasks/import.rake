require "#{Rails.root}/lib/timed_logger"

class ImportTasks
  include Rake::DSL

  def initialize
    namespace :import do
      desc 'Reimport All'
      task all: [:regions, :organizations, :development_funds, :indicators] do
        puts 'All data reimported!'
      end

      desc 'Add regions'
      task regions: :environment do
        next if Rails.env.production? && !ENV['FORCE'].present?

        Region.delete_all unless ENV['KEEP_OLD'].present?

        TimedLogger.log('Add Default Regions') do
          bc = Region.create!(name: 'British Columbia', region_type: 'province')
          Region.create!(name: 'Thompson Okanagan', region_type: 'tourism_region', parent: bc)
          Region.create!(name: 'Cariboo Chilcotin Coast', region_type: 'tourism_region', parent: bc)
          Region.create!(name: 'Kootenay Rockies', region_type: 'tourism_region', parent: bc)
          Region.create!(name: 'Northern BC', slug: 'northern_british_columbia', region_type: 'tourism_region', parent: bc)
          Region.create!(name: 'Vancouver Island', region_type: 'tourism_region', parent: bc)
          Region.create!(name: 'Vancouver Coast and Mountains', region_type: 'tourism_region', active: false, parent: bc)
        end
      end

      desc 'Reimport Organizations'
      task organizations: :environment do
        next if Rails.env.production? && !ENV['FORCE'].present?

        unless ENV['KEEP_OLD'].present?
          Organization.delete_all
          BusinessType.delete_all
        end

        TimedLogger.log('Import Organizations with Regions and Business Types') do
          run_importer CSVImport::Organizations, csv_file('organizations.csv')
        end
      end

      desc 'Reimport Organizations'
      task development_funds: :environment do
        next if Rails.env.production? && !ENV['FORCE'].present?

        DevelopmentFund.delete_all unless ENV['KEEP_OLD'].present?

        TimedLogger.log('Import Development Funds') do
          run_importer CSVImport::DevelopmentFunds, csv_file('Block3_Development_Funds - EXPORT_CSV.csv')
        end
      end

      task indicators: :environment do
        next if Rails.env.production? && !ENV['FORCE'].present?

        unless ENV['KEEP_OLD'].present?
          IndicatorValue.delete_all
          Indicator.delete_all
        end

        ActiveRecord::Base.connection.cache do
          TimedLogger.log('Import Indicator Values for Block 1 Tourism Industry') do
            run_importer CSVImport::IndicatorValues, csv_file('Block1_Tourism_Industry_and_Arrivals - EXPORT_CSV.csv')
          end

          TimedLogger.log('Import Indicator Values for Block 2 Accommodation') do
            run_importer CSVImport::IndicatorValues, csv_file('Block2_Accommodation_Hotel_Information - EXPORT_CSV.csv')
          end

          TimedLogger.log('Import Indicator Values for Block 4 Airport') do
            run_importer CSVImport::IndicatorValues, csv_file('Block4_Airport - EXPORT_CSV.csv')
          end

          TimedLogger.log('Import Indicator Values for Block 5 Employment') do
            run_importer CSVImport::IndicatorValues, csv_file('Block5_Employment - EXPORT_CSV.csv')
          end

          TimedLogger.log('Import Indicator Values for Block 6 Headers and General Insights') do
            run_importer CSVImport::IndicatorValues, csv_file('Block6_Headers_and_General_insights - EXPORT_CSV.csv')
          end

          TimedLogger.log('Create dynamic indicators') do
            Indicators::EstablishmentsByType.generate
            Indicators::DomesticVisits.generate
            Indicators::AirportTotalDestinations.generate
            Indicators::AirportTopAverageConnectionsPerWeek.generate
            Indicators::DevelopmentFundsBySource.generate
            Indicators::DevelopmentFundsVolumeBySource.generate
            Indicators::EmploymentByRegionAnnually.generate
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
