# == Schema Information
#
# Table name: business_types
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  parent_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe BusinessType, type: :model do
  subject { build(:business_type) }

  it { is_expected.to be_valid }

  it 'should not be valid without name' do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end
end
