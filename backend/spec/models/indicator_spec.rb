require 'rails_helper'

RSpec.describe Indicator, type: :model do
  subject { build(:indicator) }

  it { is_expected.to be_valid }
end
