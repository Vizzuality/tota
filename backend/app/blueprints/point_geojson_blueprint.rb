class PointGeojsonBlueprint < Blueprinter::Base
  field(:type) { 'Feature' }
  field :geometry do |point_data|
    {
      type: 'Point',
      coordinates: [point_data.longitude, point_data.latitude]
    }
  end
  field :properties do |organization, options|
    if organization.blueprint
      organization.blueprint.render_as_hash(organization, **options.fetch(:blueprint_options, {}))
    else
      {}
    end
  end
end
