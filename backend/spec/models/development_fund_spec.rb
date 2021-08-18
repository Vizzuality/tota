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
require 'rails_helper'

RSpec.describe DevelopmentFund, type: :model do
  subject { build(:development_fund) }

  it { is_expected.to be_valid }

  it 'should not be valid without project title' do
    subject.project_title = nil
    expect(subject).to have(1).errors_on(:project_title)
  end
end
