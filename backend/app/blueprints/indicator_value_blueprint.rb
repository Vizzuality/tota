class IndicatorValueBlueprint < Blueprinter::Base
  fields :date, :category_1, :category_2, :value

  # TOOD: fix this to be imported in better format, ensure that in importer
  field :date do |val|
    next if val.date.nil?

    if val.date.match?(/^\d\d\d\d-\d$/)
      year, month = val.date.split('-')
      "#{year}-0#{month}"
    else
      val.date
    end
  end

  field :region do |val|
    val.region&.name
  end
end
