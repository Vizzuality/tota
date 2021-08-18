# == Schema Information
#
# Table name: regions
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  parent_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Region < ApplicationRecord
  has_many :subregions, class_name: 'Region', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Region', optional: true

  TYPES = %w[province tourism_region tourism_subregion].freeze
  enum region_type: array_to_enum_hash(TYPES)

  validates_presence_of :name

  def subregion?
    parent.present?
  end
end
