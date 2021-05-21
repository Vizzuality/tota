class Indicator < ApplicationRecord
  has_many :indicator_values

  validates_presence_of :slug
end
