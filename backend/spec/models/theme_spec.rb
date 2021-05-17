require 'rails_helper'

RSpec.describe Theme, type: :model do
  subject { build(:theme) }

  it { is_expected.to be_valid }
end
