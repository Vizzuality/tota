class Theme < ApplicationRecord
  has_many :indicators

  validates_presence_of :name
end
