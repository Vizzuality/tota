class IndicatorValue < ApplicationRecord
  belongs_to :indicator

  validates_presence_of :value
end
