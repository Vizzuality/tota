# == Schema Information
#
# Table name: organizations
#
#  id                       :bigint           not null, primary key
#  name                     :string           not null
#  region_id                :bigint           not null
#  business_type_id         :bigint
#  external_company_id      :bigint
#  indigenous_ownership     :boolean
#  biosphere_program_member :boolean
#  website_url              :text
#  latitude                 :decimal(10, 6)
#  longitude                :decimal(10, 6)
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  accessibility            :boolean
#  show_on_platform         :boolean          default(TRUE), not null
#  source                   :string
#
require 'rails_helper'

RSpec.describe Organization, type: :model do
  subject { build(:organization) }

  it { is_expected.to be_valid }

  it 'should not be valid without name' do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end
end
