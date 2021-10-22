# == Schema Information
#
# Table name: development_funds
#
#  id                   :bigint           not null, primary key
#  project_title        :string           not null
#  project_description  :text
#  recipient            :string
#  lead_organization    :string
#  region_id            :bigint           not null
#  location             :string
#  latitude             :decimal(10, 6)
#  longitude            :decimal(10, 6)
#  categories           :string           default([]), is an Array
#  scope                :string
#  planning_area        :string
#  second_planning_area :string
#  total_project_cost   :float
#  key_funding_amount   :float
#  key_funding_source   :string
#  funding_subtype      :string
#  funding_call_year    :integer
#  funding_call_month   :string
#  project_status       :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class DevelopmentFund < ApplicationRecord
  belongs_to :region

  validates_presence_of :project_title, :key_funding_source

  def blueprint
    DevelopmentFundBlueprint
  end
end
