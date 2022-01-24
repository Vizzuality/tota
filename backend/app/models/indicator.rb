# == Schema Information
#
# Table name: indicators
#
#  id         :bigint           not null, primary key
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  dynamic    :boolean          default(FALSE), not null
#
class Indicator < ApplicationRecord
  has_many :indicator_values, dependent: :destroy

  scope :dynamic, -> { where(dynamic: true) }
  scope :imported, -> { where(dynamic: [nil, false]) }

  validates_presence_of :slug
  validates_uniqueness_of :slug
end
