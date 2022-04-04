# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  name                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  account_type           :string           default("user"), not null
#
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
