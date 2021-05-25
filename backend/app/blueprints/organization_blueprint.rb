class OrganizationBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :latitude, :longitude

  field :region do |org|
    if org.region.subregion?
      org.region.parent.name
    else
      org.region.name
    end
  end
  field :subregion do |org|
    org.region.name if org.region.subregion?
  end

  field :business_type do |org|
    next if org.business_type.nil?

    if org.business_type.subtype?
      org.business_type.parent.name
    else
      org.business_type.name
    end
  end
  field :business_subtype do |org|
    next if org.business_type.nil?

    org.business_type.name if org.business_type.subtype?
  end
end