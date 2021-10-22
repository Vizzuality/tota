module CSVImport
  class IndicatorValues < BaseImporter
    def import
      prepare_cache

      values = []

      import_each_csv_row(csv) do |row|
        value = IndicatorValue.new

        # TODO: talk with Tamara what to do with empty values and not defined region
        next if row[:value].blank?
        next if row[:region] == 'not defined'

        value.indicator = Indicator.find_or_create_by(slug: row[:indicator_code])
        value.region = find_region(row[:region])
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

    def prepare_cache
      @regions = Region.all.map { |r| [r.slug, r] }.to_h
    end

    def find_region(region_name)
      return if region_name.blank?

      @regions[Slug.create(region_name)] or raise ActiveRecord::NotFound, "Cannot find region with name #{region_name}"
    end
  end
end
