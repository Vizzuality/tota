require 'rails_helper'

RSpec.describe Indicators::EstablishmentsByType do
  describe 'generate' do
    before_all do
      bt1 = create(:business_type, name: 'Accommodation')
      bt2 = create(:business_type, name: 'Bed & Breakfast', parent: bt1)
      bt3 = create(:business_type, name: 'Activity / Attraction')
      bt4 = create(:business_type, name: 'Transportation')
      @pr = create(:region, :province, name: 'province')
      @r1 = create(:region, name: 'region 1', parent: @pr)
      @r2 = create(:region, name: 'region 2', parent: @pr)

      create(:organization, business_type: bt1, region: @r1, biosphere_program_member: true)
      create(:organization, business_type: bt1, region: @r1)
      create(:organization, business_type: bt2, region: @r1, biosphere_program_member: true)
      create(:organization, business_type: bt3, region: @r1)
      create(:organization, business_type: bt3, region: @r1, biosphere_program_member: true)

      create(:organization, business_type: bt2, region: @r2)
      create(:organization, business_type: bt2, region: @r2, biosphere_program_member: true)
      create(:organization, business_type: bt3, region: @r2, biosphere_program_member: true)
      create(:organization, business_type: bt4, region: @r2)

      Indicators::EstablishmentsByType.generate
    end

    describe 'all' do
      it 'returns correct values grouped by region and business type' do
        indicator = Indicator.find_by(slug: 'establishments_by_type')
        values = indicator.indicator_values.where(category_2: 'all')
        r1_values = values.where(region: @r1)
        r2_values = values.where(region: @r2)
        pr_values = values.where(region: @pr)

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(8)
        expect(r1_values.count).to eq(2)
        expect(r2_values.count).to eq(3)
        expect(pr_values.count).to eq(3)
        expect(r1_values.where(category_1: 'Accommodation').first.value).to eq(3.0)
        expect(r1_values.where(category_1: 'Activity / Attraction').first.value).to eq(2.0)
        expect(r1_values.where(category_1: 'Transportation').first).to be_nil
        expect(r2_values.where(category_1: 'Accommodation').first.value).to eq(2.0)
        expect(r2_values.where(category_1: 'Activity / Attraction').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Transportation').first.value).to eq(1.0)
        expect(pr_values.where(category_1: 'Accommodation').first.value).to eq(5.0)
        expect(pr_values.where(category_1: 'Activity / Attraction').first.value).to eq(3.0)
        expect(pr_values.where(category_1: 'Transportation').first.value).to eq(1.0)
      end
    end

    describe 'biosphere program member' do
      it 'returns correct values grouped by region and business type' do
        indicator = Indicator.find_by(slug: 'establishments_by_type')
        values = indicator.indicator_values.where(category_2: 'biosphere')
        r1_values = values.where(region: @r1)
        r2_values = values.where(region: @r2)
        pr_values = values.where(region: @pr)

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(6)
        expect(r1_values.count).to eq(2)
        expect(r2_values.count).to eq(2)
        expect(pr_values.count).to eq(2)
        expect(r1_values.where(category_1: 'Accommodation').first.value).to eq(2.0)
        expect(r1_values.where(category_1: 'Activity / Attraction').first.value).to eq(1.0)
        expect(r1_values.where(category_1: 'Transportation').first).to be_nil
        expect(r2_values.where(category_1: 'Accommodation').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Activity / Attraction').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Transportation').first).to be_nil
        expect(pr_values.where(category_1: 'Accommodation').first.value).to eq(3.0)
        expect(pr_values.where(category_1: 'Activity / Attraction').first.value).to eq(2.0)
        expect(pr_values.where(category_1: 'Transportation').first).to be_nil
      end
    end

    describe 'total establishments' do
      it 'returns correct values grouped by region' do
        indicator = Indicator.find_by(slug: 'total_establishments')
        values = indicator.indicator_values

        expect(indicator.dynamic).to be(true)
        expect(values.count).to eq(3)
        expect(values.find_by(region: @r1).value).to eq(5.0)
        expect(values.find_by(region: @r2).value).to eq(4.0)
        expect(values.find_by(region: @pr).value).to eq(9.0)
      end
    end
  end
end
