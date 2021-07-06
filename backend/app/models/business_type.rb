# == Schema Information
#
# Table name: business_types
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  parent_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class BusinessType < ApplicationRecord
  has_many :subtypes, class_name: 'BusinessType', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'BusinessType', optional: true

  validates_presence_of :name

  def subtype?
    parent.present?
  end
end
