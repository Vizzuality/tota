# == Schema Information
#
# Table name: organizations
#
#  id                       :bigint           not null, primary key
#  name                     :string           not null
#  region_id                :bigint           not null
#  business_type_id         :bigint
#  external_company_id      :bigint
#  indigenous_ownership     :boolean
#  biosphere_program_member :boolean
#  website_url              :text
#  latitude                 :decimal(10, 6)
#  longitude                :decimal(10, 6)
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  accessibility            :boolean
#  show_on_platform         :boolean          default(TRUE), not null
#  source                   :string
#
class Organization < ApplicationRecord
  belongs_to :region
  belongs_to :business_type, optional: true

  scope :visible, -> { where(show_on_platform: true) }
  scope :with_regions, -> { includes(region: [parent: :parent]) }

  validates_presence_of :name

  def blueprint
    OrganizationBlueprint
  end

  def region_name
    regions.find(&:tourism_region?)&.name
  end

  def subregion_name
    regions.find(&:tourism_subregion?)&.name
  end

  def regions
    [region, region.parent, region.parent&.parent].compact
  end

  def business_type_name
    return if business_type.nil?

    if business_type.subtype?
      business_type.parent.name
    else
      business_type.name
    end
  end

  def business_subtype_name
    return if business_type.nil?

    business_type.name if business_type.subtype?
  end

  def website_url_link
    return if website_url.nil?
    return website_url if website_url.start_with?('http')

    "http://#{website_url}"
  end
end
