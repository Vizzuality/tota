class WidgetBlueprint < Blueprinter::Base
  identifier :slug

  fields :title, :sub_title, :description, :note, :position
  association :sources, blueprint: SourceBlueprint

  field :theme_slug do |val|
    val.theme&.slug
  end
end
