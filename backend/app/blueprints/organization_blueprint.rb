class OrganizationBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :latitude, :longitude, :source,
         :indigenous_ownership, :biosphere_program_member, :accessibility

  field :website_url_link, name: :website_url
  field :region_name, name: :region
  field :subregion_name, name: :subregion

  field :business_type_name, name: :business_type
  field :business_subtype_name, name: :business_subtype
  field :features_number do |org|
    org.slice(:indigenous_ownership, :biosphere_program_member, :accessibility).values.count { |v| v == true }
  end
end
