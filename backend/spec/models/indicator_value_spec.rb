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
