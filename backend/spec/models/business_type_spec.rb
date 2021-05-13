require 'rails_helper'

RSpec.describe BusinessType, type: :model do
  subject { build(:business_type) }

  it { is_expected.to be_valid }
end
