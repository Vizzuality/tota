require 'rails_helper'

RSpec.describe Indicator, type: :model do
  subject { build(:indicator) }

  it { is_expected.to be_valid }

  it 'should not be valid without slug' do
    subject.slug = nil
    expect(subject).to have(1).errors_on(:slug)
  end
end
