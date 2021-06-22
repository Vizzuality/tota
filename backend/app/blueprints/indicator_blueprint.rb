class IndicatorBlueprint < Blueprinter::Base
  identifier :slug

  association :indicator_values, blueprint: IndicatorValueBlueprint
end
