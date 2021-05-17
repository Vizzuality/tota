require 'rails_helper'

RSpec.describe IndicatorValue, type: :model do
  subject { build(:indicator_value) }

  it { is_expected.to be_valid }
end
