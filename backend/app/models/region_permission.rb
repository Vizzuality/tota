# == Schema Information
#
# Table name: region_permissions
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  region_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class RegionPermission < ApplicationRecord
  belongs_to :user
  belongs_to :region
end
