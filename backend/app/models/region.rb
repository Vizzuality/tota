class Region < ApplicationRecord
  has_many :subregions, class_Name: 'Region', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Region', optional: true
end
