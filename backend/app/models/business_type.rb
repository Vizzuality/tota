class BusinessType < ApplicationRecord
  has_many :subtypes, class_Name: 'BusinessType', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'BusinessType', optional: true
end
