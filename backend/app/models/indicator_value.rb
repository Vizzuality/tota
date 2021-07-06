# == Schema Information
#
# Table name: indicator_values
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  date         :string
#  region       :string
#  category_1   :string
#  category_2   :string
#  value        :float            not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class IndicatorValue < ApplicationRecord
  belongs_to :indicator

  validates_presence_of :value
end
