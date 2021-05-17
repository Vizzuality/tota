require 'rails_helper'

RSpec.describe Region, type: :model do
  subject { build(:region) }

  it { is_expected.to be_valid }

  it 'should not be valid without name' do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end
end
