class Organization < ApplicationRecord
  belongs_to :region
  belongs_to :business_type, optional: true
end
