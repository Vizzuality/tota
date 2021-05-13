require 'rails_helper'

RSpec.describe Region, type: :model do
  subject { build(:region) }

  it { is_expected.to be_valid }
end
