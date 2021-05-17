class Indicator < ApplicationRecord
  belongs_to :theme
  has_many :indicator_values

  validates_presence_of :name, :code
end
