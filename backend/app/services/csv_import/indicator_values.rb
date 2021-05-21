module CSVImport
  class IndicatorValues < BaseImporter
    def import
      values = []

      import_each_csv_row(csv) do |row|
        value = IndicatorValue.new

        value.indicator = Indicator.find_or_create_by(slug: row[:indicator_code])
        value.region = row[:region]
        value.date = row[:date]
        value.category_1 = row[:category_1]
        value.category_2 = row[:category_2]
        value.value = row[:value]

        value.validate!

        values << value
      end

      IndicatorValue.import! values, all_or_none: true
    end

    private

    def required_headers
      [
        :indicator_code,
        :region,
        :date,
        :category_1,
        :category_2,
        :value
      ]
    end
  end
end
