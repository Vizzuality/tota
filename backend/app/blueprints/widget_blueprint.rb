class WidgetBlueprint < Blueprinter::Base
  identifier :slug

  fields :title, :sub_title, :description, :note, :position
  association :sources, blueprint: SourceBlueprint

  field :theme_slug do |val|
    val.theme&.slug
  end
  field :regions do |val, context|
    regions = val.config['regions']

    if context[:user].nil? || val.public?
      regions
    elsif regions.present?
      regions & context[:user].visible_regions.pluck(:slug)
    else
      context[:user].visible_regions.pluck(:slug)
    end
  end
end
