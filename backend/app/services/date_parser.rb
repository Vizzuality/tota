class DateParser
  include Singleton

  TWO_DIGIT_YEAR_CUTOFF = 2040

  DateParserError = Class.new(StandardError)

  class << self
    delegate :safe_parse, :safe_parse!, :parse_date, to: :instance
  end

  def safe_parse!(date, expected_date_formats)
    return if date.nil?

    safe_parse(date, expected_date_formats) or
      raise DateParserError, "Cannot parse date: #{date}, expected formats: #{expected_date_formats.join(', ')}"
  end

  def safe_parse(date, expected_date_formats)
    return if date.nil?

    expected_date_formats.filter_map { |format| parse_date(date, format) }.first
  end

  def parse_date(date_text, format)
    date = DateTime.strptime(date_text.strip, format).to_date
    return date.prev_year(100) if two_digit_year?(format) && date.year > TWO_DIGIT_YEAR_CUTOFF

    date
  rescue ArgumentError
    nil
  end

  private

  def two_digit_year?(format)
    format.include?('%y')
  end
end
