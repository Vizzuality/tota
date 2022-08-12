# == Schema Information
#
# Table name: additional_resource_groups
#
#  id         :bigint           not null, primary key
#  name       :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AdditionalResourceGroup < ApplicationRecord
  acts_as_list

  has_many :additional_resources

  validates_presence_of :name
end
