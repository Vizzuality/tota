require 'rails_helper'

RSpec.describe 'API V1 Indicators', type: :request do
  before_all do
    bt1 = create(:business_type, name: 'Accommodation')
    bt2 = create(:business_type, name: 'Bed & Breakfast', parent: bt1)
    bt3 = create(:business_type, name: 'Activity / Attraction')
    bt4 = create(:business_type, name: 'Transportation')
    r1 = create(:region, name: 'region 1')
    r2 = create(:region, name: 'region 2')

    create(:organization, business_type: bt1, region: r1, biosphere_program_member: true)
    create(:organization, business_type: bt1, region: r1)
    create(:organization, business_type: bt2, region: r1, biosphere_program_member: true)
    create(:organization, business_type: bt3, region: r1)
    create(:organization, business_type: bt3, region: r1, biosphere_program_member: true)

    create(:organization, business_type: bt2, region: r2)
    create(:organization, business_type: bt2, region: r2, biosphere_program_member: true)
    create(:organization, business_type: bt3, region: r2, biosphere_program_member: true)
    create(:organization, business_type: bt4, region: r2)

    Indicators::EstablishmentsByType.generate
  end

  let_it_be(:visits_by_origin) do
    create(
      :indicator,
      slug: 'visits_by_origin',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434'),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333'),
        build(:indicator_value, date: '2020-02', category_1: 'Canada', value: '2222'),
        build(:indicator_value, date: '2020-02', category_1: 'Germany', value: '2222')
      ]
    )
  end
  let_it_be(:stays_by_origin) {
    create(
      :indicator,
      slug: 'stays_by_origin',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '11111'),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333'),
        build(:indicator_value, date: '2020-02', category_1: 'Canada', value: '2222'),
        build(:indicator_value, date: '2020-02', category_1: 'Germany', value: '2222')
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
