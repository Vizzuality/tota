require 'rails_helper'

RSpec.describe 'API V1 Indicator Values', type: :request do
  before_all do
    bt1 = create(:business_type, name: 'Accommodation')
    bt2 = create(:business_type, name: 'Bed & Breakfast', parent: bt1)
    bt3 = create(:business_type, name: 'Activity / Attraction')
    bt4 = create(:business_type, name: 'Transportation')
    @r1 = create(:region, name: 'region 1')
    @r2 = create(:region, name: 'region 2')

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

    create(:widget, slug: 'widget1', theme: create(:theme, slug: 'theme1'))
  end

  before(:each) do
    allow(Theme).to receive(:config).and_return(
      theme1: {
        slug: 'theme1',
        widgets: {
          slug: 'widget1',
          indicators: %w[visits_by_origin stays_by_origin]
        }
      }.with_indifferent_access
    )
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
  let_it_be(:not_visible_indicator) do
    create(
      :indicator,
      slug: 'not_visible_indicator',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: @r1),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: @r1),
        build(:indicator_value, date: '2020-02', category_1: 'Canada', value: '2222', region: @r1),
        build(:indicator_value, date: '2020-02', category_1: 'Germany', value: '2222', region: @r1)
      ]
    )
  end

  describe 'GET #index' do
    context 'without providing widget' do
      it 'should error with bad_request' do
        get '/api/v1/indicator_values'

        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'with widget filter param' do
      it 'should return widget1 indicators' do
        get '/api/v1/indicator_values?filter[widget]=widget1'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicator-values')
        expect(response_json['data'].map { |d| d['indicator'] }.uniq).not_to include('not_visible_indicator')
      end

      context 'filters' do
        it 'should filter by slug' do
          get '/api/v1/indicator_values?filter[widget]=widget1&filter[indicator]=visits_by_origin'

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/indicator-values-filter-by-slug')
        end
      end

      context 'sparse fieldset' do
        it 'should work' do
          get '/api/v1/indicator_values?filter[widget]=widget1&fields=indicator,date,value'

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/indicator-values-sparse-fieldset')
        end
      end
    end
  end
end
