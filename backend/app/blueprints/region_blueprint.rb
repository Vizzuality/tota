class RegionBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :parent_id
end
