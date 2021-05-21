class Organization < ApplicationRecord
  belongs_to :region
  belongs_to :business_type, optional: true

  validates_presence_of :name
end
