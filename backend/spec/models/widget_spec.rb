require 'rails_helper'

RSpec.describe Widget, type: :model do
  subject { build(:widget) }

  it { is_expected.to be_valid }

  it 'should not be valid without slug' do
    subject.slug = nil
    expect(subject).to have(1).errors_on(:slug)
  end

  it 'should not be valid if slug taken' do
    create(:widget, slug: 'taken')
    subject.slug = 'taken'
    expect(subject).to have(1).errors_on(:slug)
  end
end
