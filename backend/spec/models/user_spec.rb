require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to be_valid }

  it 'should be invalid without email' do
    subject.email = nil
    expect(subject).to have(1).errors_on(:email)
  end
end
