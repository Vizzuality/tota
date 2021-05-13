class OrganizationSerializer
  include JSONAPI::Serializer

  attributes :name, :latitude, :longitude

  attribute :region do |org|
    if org.region.subregion?
      org.region.parent.name
    else
      org.region.name
    end
  end
  attribute :subregion do |org|
    org.region.name if org.region.subregion?
  end

  attribute :business_type do |org|
    next if org.business_type.nil?

    if org.business_type.subtype?
      org.business_type.parent.name
    else
      org.business_type.name
    end
  end
  attribute :business_subtype do |org|
    next if org.business_type.nil?

    org.business_type.name if org.business_type.subtype?
  end
  # belongs_to :region
end
