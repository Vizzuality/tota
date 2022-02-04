# == Schema Information
#
# Table name: indicator_values
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  date         :string
#  category_1   :string
#  category_2   :string
#  value        :float            not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  region_id    :bigint
#
class IndicatorValue < ApplicationRecord
  belongs_to :indicator
  belongs_to :region, optional: true

  validates_presence_of :value

  scope :only_public, -> { where(indicator: Indicator.only_public) }
  scope :for_configured_indicators, -> { where(indicator: Indicator.only_configured) }

  def year
    DateParser.safe_parse(date, ['%Y-%m', '%Y'])&.year
  end
end
