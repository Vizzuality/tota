class IndicatorBlueprint < Blueprinter::Base
  identifier :code

  fields :name

  field :values do |i|
    i.indicator_values.select(:date, :category_1, :category_2, :region, :value).map do |value|
      value.attributes.transform_keys(&:to_sym).slice(:date, :category_1, :category_2, :region, :value)
    end
  end
end
