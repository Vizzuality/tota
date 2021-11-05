require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to be_valid }

  it 'should be invalid without email' do
    subject.email = nil
    expect(subject).to have(1).errors_on(:email)
  end

  it 'should be invalid with short password' do
    subject.password = 'secret'
    expect(subject.errors_on(:password)).to include('must be at least 12 characters long')
  end

  it 'should be invalid with too simple password' do
    subject.password = 'verysimplepassword'
    expect(subject.errors_on(:password)).to include('must include at least one lowercase letter, one uppercase letter, and one digit')
  end
end
