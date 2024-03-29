require 'rails_helper'

RSpec.describe 'API V1 Indicator', type: :request do
  before_all do
    bt1 = create(:business_type, name: 'Accommodation')
    bt2 = create(:business_type, name: 'Bed & Breakfast')
    bt3 = create(:business_type, name: 'Activity / Attraction')
    bt4 = create(:business_type, name: 'Transportation')
    @r1 = create(:region, name: 'region 1')
    @r2 = create(:region, name: 'region 2')

    create(:organization, business_type_1: bt1, business_type_2: bt3, region: @r1, biosphere_program_member: true)
    create(:organization, business_type_1: bt1, business_type_2: bt3, region: @r1)
    create(:organization, business_type_1: bt2, business_type_2: bt1, region: @r1, biosphere_program_member: true)

    create(:organization, business_type_1: bt2, region: @r2)
    create(:organization, business_type_1: bt2, region: @r2, biosphere_program_member: true)
    create(:organization, business_type_1: bt3, region: @r2, biosphere_program_member: true)
    create(:organization, business_type_1: bt4, business_type_2: bt1, region: @r2)

    Indicators::EstablishmentsByType.generate
  end

  let_it_be(:visits_by_origin) do
    create(
      :indicator,
      slug: 'visits_by_origin',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: @r1),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: @r1),
        build(:indicator_value, date: '2020-02', category_1: 'Canada', value: '2222', region: @r1),
        build(:indicator_value, date: '2020-02', category_1: 'Germany', value: '2222', region: @r1)
      ]
    )
  end
  let_it_be(:stays_by_origin) {
    create(
      :indicator,
      slug: 'stays_by_origin',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '11111', region: @r1),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: @r1),
        build(:indicator_value, date: '2020-02', category_1: 'Canada', value: '2222', region: @r1),
        build(:indicator_value, date: '2020-02', category_1: 'Germany', value: '2222', region: @r1)
      ]
    )
  }

  describe 'GET #index' do
    it 'should return indicators' do
      get '/api/v1/indicators'

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot('api/v1/indicators')
    end

    context 'filters' do
      it 'should filter by slug' do
        get '/api/v1/indicators?filter[slug]=visits_by_origin'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicators-filter-by-slug')
      end
    end

    context 'sparse fieldset' do
      it 'should work' do
        get '/api/v1/indicators?fields=slug'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicators-sparse-fieldset')
      end
    end
  end
end
