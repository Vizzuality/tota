# == Schema Information
#
# Table name: indicators
#
#  id         :bigint           not null, primary key
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Indicator < ApplicationRecord
  has_many :indicator_values, dependent: :destroy

  validates_presence_of :slug
  validates_uniqueness_of :slug
end
