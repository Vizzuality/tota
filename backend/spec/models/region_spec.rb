# == Schema Information
#
# Table name: regions
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  parent_id   :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  region_type :string           default("tourism_region"), not null
#  slug        :string           not null
#  active      :boolean          default(TRUE)
#
require 'rails_helper'

RSpec.describe Region, type: :model do
  subject { build(:region) }

  it { is_expected.to be_valid }

  it 'should not be valid without name' do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end
end
