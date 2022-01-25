class WidgetBlueprint < Blueprinter::Base
  identifier :slug

  fields :title, :sub_title, :description, :note, :position
  association :sources, blueprint: SourceBlueprint

  field :theme_slug do |val|
    val.theme&.slug
  end
  # nil regions_whitelist means widget visible for all
  field :regions_whitelist do |widget, context|
    regions_whitelist = widget.config&.dig('regions_whitelist')

    if context[:user].nil? || widget.public?
      regions_whitelist
    elsif regions_whitelist.present?
      regions_whitelist & context[:user].visible_regions.pluck(:slug)
    else
      context[:user].visible_regions.pluck(:slug)
    end
  end
end
