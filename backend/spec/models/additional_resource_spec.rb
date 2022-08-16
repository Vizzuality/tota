require 'rails_helper'

RSpec.describe AdditionalResource, type: :model do
  subject { build(:additional_resource_file) }

  it { is_expected.to be_valid }

  it 'should not be valid without title' do
    subject.title = nil
    expect(subject).to have(1).errors_on(:title)
  end

  it 'should not be valid without file and link' do
    subject.link = nil
    subject.file = nil
    expect(subject).to have(1).errors_on(:base)
  end

  it 'should not be valid with both file and link' do
    subject.link = 'https://example.com'
    subject.file = fixture_file 'test.pdf'
    expect(subject).to have(1).errors_on(:base)
  end
end
