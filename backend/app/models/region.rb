class Region < ApplicationRecord
  has_many :subregions, class_name: 'Region', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Region', optional: true

  validates_presence_of :name

  def subregion?
    parent_id.present?
  end
end
