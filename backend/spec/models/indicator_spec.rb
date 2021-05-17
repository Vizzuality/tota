require 'rails_helper'

RSpec.describe Indicator, type: :model do
  subject { build(:indicator) }

  it { is_expected.to be_valid }

  it 'should not be valid without name' do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it 'should not be valid without code' do
    subject.code = nil
    expect(subject).to have(1).errors_on(:code)
  end

  it 'should not be valid without theme' do
    subject.theme = nil
    expect(subject).to have(1).errors_on(:theme)
  end
end
