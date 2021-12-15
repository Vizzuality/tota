# == Schema Information
#
# Table name: widgets
#
#  id          :bigint           not null, primary key
#  theme_id    :bigint           not null
#  slug        :string           not null
#  title       :string           not null
#  sub_title   :string
#  description :text
#  note        :text
#  sources     :jsonb
#  position    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
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
