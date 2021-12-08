require 'rails_helper'

RSpec.describe Theme, type: :model do
  subject { build(:theme) }

  it { is_expected.to be_valid }

  it 'should not be valid without slug' do
    subject.slug = nil
    expect(subject).to have(1).errors_on(:slug)
  end

  it 'should not be valid if slug taken' do
    create(:theme, slug: 'taken')
    subject.slug = 'taken'
    expect(subject).to have(1).errors_on(:slug)
  end

  it 'should not be valid without title' do
    subject.title = nil
    expect(subject).to have(1).errors_on(:title)
  end
end
