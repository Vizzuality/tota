module CSVExport
  class IndicatorValues
    def export(indicator_values)
      headers = %w[
        indicator_code
        date
        region
        category_1
        category_2
        value
      ]

      CSV.generate do |csv|
        csv << headers

        indicator_values.each do |v|
          csv << [
            v.indicator.slug,
            v.date,
            v.region.name,
            v.category_1,
            v.category_2,
            v.value
          ]
        end
      end
    end
  end
end
