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
require 'rails_helper'

RSpec.describe IndicatorValue, type: :model do
  subject { build(:indicator_value) }

  it { is_expected.to be_valid }

  it 'should not be valid without value' do
    subject.value = nil
    expect(subject).to have(1).errors_on(:value)
  end

  it 'should not be valid without indicator' do
    subject.indicator = nil
    expect(subject).to have(1).errors_on(:indicator)
  end
end
