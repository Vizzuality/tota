require 'rails_helper'

RSpec.describe Indicators::EstablishmentsByType do
  describe 'generate' do
    before_all do
      bt1 = create(:business_type, name: 'Accommodation')
      bt2 = create(:business_type, name: 'Bed & Breakfast')
      bt3 = create(:business_type, name: 'Activity / Attraction')
      bt4 = create(:business_type, name: 'Transportation')
      @pr = create(:region, :province, name: 'province')
      @r1 = create(:region, name: 'region 1', parent: @pr)
      @r2 = create(:region, name: 'region 2', parent: @pr)

      create(:organization, business_type_1: bt1, business_type_2: bt3, region: @r1, biosphere_program_member: true)
      create(:organization, business_type_1: bt1, business_type_2: bt3, region: @r1)
      create(:organization, business_type_1: bt2, business_type_2: bt1, region: @r1, biosphere_program_member: true)

      create(:organization, business_type_1: bt2, region: @r2)
      create(:organization, business_type_1: bt2, region: @r2, biosphere_program_member: true)
      create(:organization, business_type_1: bt3, region: @r2, biosphere_program_member: true)
      create(:organization, business_type_1: bt4, business_type_2: bt1, region: @r2)

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
        # province has 4 business types, r1 has 3, r2 has 4 = 11
        expect(values.count).to eq(11)
        expect(r1_values.count).to eq(3)
        expect(r2_values.count).to eq(4)
        expect(pr_values.count).to eq(4)

        expect(r1_values.where(category_1: 'Accommodation').first.value).to eq(3.0)
        expect(r1_values.where(category_1: 'Bed & Breakfast').first.value).to eq(1.0)
        expect(r1_values.where(category_1: 'Activity / Attraction').first.value).to eq(2.0)
        expect(r1_values.where(category_1: 'Transportation').first).to be_nil

        expect(r2_values.where(category_1: 'Accommodation').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Bed & Breakfast').first.value).to eq(2.0)
        expect(r2_values.where(category_1: 'Activity / Attraction').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Transportation').first.value).to eq(1.0)

        expect(pr_values.where(category_1: 'Accommodation').first.value).to eq(4.0)
        expect(pr_values.where(category_1: 'Bed & Breakfast').first.value).to eq(3.0)
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
        # province has 3 business types, r1 has 3, r2 has 2 = 8
        expect(values.count).to eq(8)
        expect(r1_values.count).to eq(3)
        expect(r2_values.count).to eq(2)
        expect(pr_values.count).to eq(3)

        expect(r1_values.where(category_1: 'Accommodation').first.value).to eq(2.0)
        expect(r1_values.where(category_1: 'Bed & Breakfast').first.value).to eq(1.0)
        expect(r1_values.where(category_1: 'Activity / Attraction').first.value).to eq(1.0)
        expect(r1_values.where(category_1: 'Transportation').first).to be_nil

        expect(r2_values.where(category_1: 'Accommodation').first).to be_nil
        expect(r2_values.where(category_1: 'Bed & Breakfast').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Activity / Attraction').first.value).to eq(1.0)
        expect(r2_values.where(category_1: 'Transportation').first).to be_nil

        expect(pr_values.where(category_1: 'Accommodation').first.value).to eq(2.0)
        expect(pr_values.where(category_1: 'Bed & Breakfast').first.value).to eq(2.0)
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
        expect(values.find_by(region: @r1).value).to eq(3.0)
        expect(values.find_by(region: @r2).value).to eq(4.0)
        expect(values.find_by(region: @pr).value).to eq(7.0)
      end
    end
  end
end
