require 'rails_helper'

RSpec.describe Source, type: :model do
  subject { build(:source) }

  it { is_expected.to be_valid }

  it 'should not be valid without text' do
    subject.text = nil
    expect(subject).to have(1).errors_on(:text)
  end

  it 'should not be valid with invalid url' do
    subject.link = 'not a valid url'
    expect(subject).to have(1).errors_on(:link)
  end
end
