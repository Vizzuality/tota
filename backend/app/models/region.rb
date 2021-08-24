# == Schema Information
#
# Table name: regions
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  parent_id   :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  region_type :string           default("tourism_region"), not null
#  slug        :string           not null
#  active      :boolean          default(TRUE)
#
class Region < ApplicationRecord
  has_many :subregions, class_name: 'Region', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Region', optional: true

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  before_validation :slugify

  TYPES = %w[province tourism_region tourism_subregion].freeze
  enum region_type: array_to_enum_hash(TYPES)

  validates_presence_of :name, :slug, :region_type

  def subregion?
    parent.present?
  end

  private

  def slugify
    self.slug = name&.parameterize(separator: '_') unless slug.present?
  end
end
