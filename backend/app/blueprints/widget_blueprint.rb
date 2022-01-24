class WidgetBlueprint < Blueprinter::Base
  identifier :slug

  fields :title, :sub_title, :description, :note, :position
  association :sources, blueprint: SourceBlueprint

  field :theme_slug do |val|
    val.theme&.slug
  end
  field :regions do |widget, context|
    regions = widget.config&.dig('regions')

    if context[:user].nil? || widget.public?
      regions
    elsif regions.present?
      regions & context[:user].visible_regions.pluck(:slug)
    else
      context[:user].visible_regions.pluck(:slug)
    end
  end
end
