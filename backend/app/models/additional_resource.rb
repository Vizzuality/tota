class AdditionalResource < ApplicationRecord
  belongs_to :group, class_name: 'AdditionalResourceGroup', optional: true
  belongs_to :region

  has_one_attached :file

  validates_presence_of :title
end
