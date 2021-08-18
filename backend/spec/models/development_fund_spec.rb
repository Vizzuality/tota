require 'rails_helper'

RSpec.describe DevelopmentFund, type: :model do
  subject { build(:development_fund) }

  it { is_expected.to be_valid }

  it 'should not be valid without project title' do
    subject.project_title = nil
    expect(subject).to have(1).errors_on(:project_title)
  end
end
