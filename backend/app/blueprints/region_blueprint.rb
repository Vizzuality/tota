class RegionBlueprint < Blueprinter::Base
  identifier :id

  fields :slug, :name, :parent_id, :region_type
end
