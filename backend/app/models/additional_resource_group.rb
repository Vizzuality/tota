class AdditionalResourceGroup < ApplicationRecord
  has_many :additional_resources

  validates_presence_of :name
end
