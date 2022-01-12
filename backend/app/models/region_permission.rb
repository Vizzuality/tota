class RegionPermission < ApplicationRecord
  belongs_to :user
  belongs_to :region
end
