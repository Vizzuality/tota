class IndicatorBlueprint < Blueprinter::Base
  identifier :code

  fields :name

  association :indicator_values, name: :values, blueprint: IndicatorValueBlueprint
end
