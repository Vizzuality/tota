class Indicator < ApplicationRecord
  has_many :indicator_values, -> { with_dynamic_indicators }

  validates_presence_of :slug
end
