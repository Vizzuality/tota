# == Schema Information
#
# Table name: business_types
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class BusinessType < ApplicationRecord
  has_and_belongs_to_many :organizations

  validates_presence_of :name
end
