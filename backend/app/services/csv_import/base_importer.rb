require 'csv'

module CSVImport
  class BaseImporter
    include ActiveModel::Model

    attr_reader :file

    validate :check_required_headers

    # @param file [File]
    def initialize(file)
      @file = file
    end

    def call
      return false unless csv
      return false unless valid?

      ActiveRecord::Base.transaction(requires_new: true) do
        perform_import

        rollback if errors.any?
      end

      errors.empty?
    end

    def import
      raise NotImplementedError
    end

    def csv
      @csv ||= parse_csv
    end

    def full_error_messages
      errors.full_messages.join(', ')
    end

    protected

    def header_converters
      [:symbol]
    end

    def csv_converters
      hard_space_converter = ->(f) { f&.gsub(160.chr('UTF-8'), 32.chr) }
      strip_converter = ->(field, _) { field&.strip }

      [hard_space_converter, strip_converter]
    end

    private

    def perform_import
      import
    end

    def rollback
      raise ActiveRecord::Rollback
    end

    def parse_csv
      CSV.parse(
        encoded_file_content,
        headers: true,
        skip_blanks: true,
        converters: csv_converters,
        header_converters: header_converters
      ).delete_if { |row| row.to_hash.values.all?(&:blank?) }
    rescue CSV::MalformedCSVError => e
      errors.add(:base, e)
      false
    end

    def encoded_file_content
      File.read(file).force_encoding('UTF-8')
    end

    def import_each_csv_row(csv)
      csv.each.with_index(2) do |row, row_index|
        handle_row_errors(row_index) do
          yield row
        end
      end
    end

    def handle_row_errors(row_index)
      yield
    rescue ActiveRecord::RecordInvalid => e
      handle_row_error(row_index, e, "for data: #{e.record.attributes}")
    rescue ActiveRecord::RecordNotFound, ArgumentError => e
      handle_row_error(row_index, e)
    rescue StandardError => e
      report_exception(e)
      handle_row_error(row_index, e)
    end

    def handle_row_error(row_index, exception, context_message = nil)
      readable_error_message = "Error on row #{row_index - 1}: #{exception.message}."

      # log error with more details
      warn "[#{self.class.name}] #{readable_error_message} #{context_message}"

      # add import error
      errors.add(:base, :invalid_row, message: readable_error_message, row: row_index)
    end

    def report_exception(exception)
      # Appsignal.set_error(exception)
    end

    def check_required_headers
      (required_headers - csv.headers).each do |header|
        errors.add(:base, "CSV missing header: #{header.to_s.humanize(keep_id_suffix: true)}")
      end
    end

    def required_headers
      []
    end
  end
end
