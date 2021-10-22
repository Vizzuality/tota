class IndicatorBlueprint < Blueprinter::Base
  identifier :slug

  association :indicator_values, blueprint: IndicatorValueBlueprint do |indicator|
    indicator.indicator_values.select { |iv| iv.region.nil? || iv.region.active? }
  end
end
