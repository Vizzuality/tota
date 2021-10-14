# == Schema Information
#
# Table name: organizations
#
#  id                       :bigint           not null, primary key
#  name                     :string           not null
#  region_id                :bigint           not null
#  business_type_id         :bigint
#  external_company_id      :integer
#  indigenous_tourism       :boolean
#  biosphere_program_member :boolean
#  website_url              :text
#  latitude                 :decimal(10, 6)
#  longitude                :decimal(10, 6)
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  accessibility            :boolean
#
class Organization < ApplicationRecord
  belongs_to :region
  belongs_to :business_type, optional: true

  validates_presence_of :name

  def blueprint
    OrganizationBlueprint
  end
end
