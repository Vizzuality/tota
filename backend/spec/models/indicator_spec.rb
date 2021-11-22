# == Schema Information
#
# Table name: indicators
#
#  id         :bigint           not null, primary key
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  dynamic    :boolean          default(FALSE), not null
#
require 'rails_helper'

RSpec.describe Indicator, type: :model do
  subject { build(:indicator) }

  it { is_expected.to be_valid }

  it 'should not be valid without slug' do
    subject.slug = nil
    expect(subject).to have(1).errors_on(:slug)
  end

  it 'should not be valid if slug taken' do
    create(:indicator, slug: 'taken')
    subject.slug = 'taken'
    expect(subject).to have(1).errors_on(:slug)
  end
end
