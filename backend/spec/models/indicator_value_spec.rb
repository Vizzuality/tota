require 'rails_helper'

RSpec.describe IndicatorValue, type: :model do
  subject { build(:indicator_value) }

  it { is_expected.to be_valid }

  it 'should not be valid without value' do
    subject.value = nil
    expect(subject).to have(1).errors_on(:value)
  end

  it 'should not be valid without indicator' do
    subject.indicator = nil
    expect(subject).to have(1).errors_on(:indicator)
  end

  describe 'dynamic indicators' do
    describe 'establishments_by_type' do
      before do
        bt1 = create(:business_type, name: 'Accommodation')
        bt2 = create(:business_type, name: 'Bed & Breakfast', parent: bt1)
        bt3 = create(:business_type, name: 'Activity / Attraction')
        bt4 = create(:business_type, name: 'Transportation')
        r1 = create(:region, name: 'region 1')
        r2 = create(:region, name: 'region 2')

        create(:organization, business_type: bt1, region: r1)
        create(:organization, business_type: bt1, region: r1)
        create(:organization, business_type: bt2, region: r1)
        create(:organization, business_type: bt3, region: r1)
        create(:organization, business_type: bt3, region: r1)

        create(:organization, business_type: bt2, region: r2)
        create(:organization, business_type: bt2, region: r2)
        create(:organization, business_type: bt3, region: r2)
        create(:organization, business_type: bt4, region: r2)

        @indicator = create(:indicator, slug: 'establishments_by_type')
      end

      it 'returns correct values grouped by region and business type' do
        values = @indicator.indicator_values
        r1_values = values.where(region: 'region 1')
        r2_values = values.where(region: 'region 2')

        expect(values.count).to eq(5)
        expect(r1_values.count).to eq(2)
        expect(r2_values.count).to eq(3)
        expect(r1_values.where(category_1: 'Accommodation').first.value).to eq(3.0)
        expect(r1_values.where(category_1: 'Activity / Attraction').first.value).to eq(2.0)
        expect(r1_values.where(category_1: 'Transportation').first).to be_nil
        expect(r2_values.where(category_1: 'Accommodation').first.value).to eq(2.0)
        expect(r2_values.where(category_1: 'Activity / Attraction').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Transportation').first.value).to eq(1.0)
      end
    end
  end
end
