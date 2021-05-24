class IndicatorBlueprint < Blueprinter::Base
  identifier :slug

  association :indicator_values, name: :values, blueprint: IndicatorValueBlueprint
end
