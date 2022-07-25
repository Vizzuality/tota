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

    theme = create(:theme, slug: 'theme_1')
    create(:widget, slug: 'widget_1', theme: theme)
    create(:widget, slug: 'widget_2', theme: theme, public: false)
  end

  before(:each) do
    allow(Theme).to receive(:config).and_return({
      theme_1: {
        slug: 'theme_1',
        widgets: [{
          slug: 'widget_1',
          indicators: %w[visits_by_origin stays_by_origin]
        }, {
          slug: 'widget_2',
          indicators: %w[private_indicator]
        }]
      }
    }.with_indifferent_access)
    Widget.reset_config
  end
  after(:each) { Widget.reset_config }

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
  let_it_be(:not_configured_indicator) do
    create(
      :indicator,
      slug: 'not_configured_indicator',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: @r1)
      ]
    )
  end
  let_it_be(:private_indicator) do
    create(
      :indicator,
      slug: 'private_indicator',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: @r1),
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: @r2)
      ]
    )
  end

  describe 'GET #index' do
    context 'as guest' do
      it 'should return values for public configured indicators' do
        get '/api/v1/indicator_values'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicator-values-guest')
        indicator_slugs = response_json['data'].map { |d| d['indicator'] }.uniq
        expect(indicator_slugs).not_to include('not_configured_indicator')
        expect(indicator_slugs).not_to include('private_indicator')
      end
    end

    context 'as user' do
      let(:user) { create(:user) }

      before(:each) { sign_in user }

      it 'should return values for public configured indicators' do
        get '/api/v1/indicator_values'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicator-values-user')
        indicator_slugs = response_json['data'].map { |d| d['indicator'] }.uniq
        expect(indicator_slugs).not_to include('not_configured_indicator')
        expect(indicator_slugs).not_to include('private_indicator')
      end

      it 'should return values for configured indicators for regions visible by user' do
        user.regions << @r1

        get '/api/v1/indicator_values'

        expect(response).to have_http_status(:ok)
        indicator_slugs = response_json['data'].map { |d| d['indicator'] }.uniq
        private_indicator_data = response_json['data'].select { |d| d['indicator'] == 'private_indicator' }
        expect(indicator_slugs).not_to include('not_configured_indicator')
        expect(private_indicator_data.any?).to be(true)
        expect(private_indicator_data.map { |d| d['region_slug'] }.uniq).not_to include(@r2.slug)
      end
    end

    context 'as admin' do
      let(:admin) { create(:admin) }

      before(:each) { sign_in admin }

      it 'should return values for all configured indicators' do
        get '/api/v1/indicator_values'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicator-values-admin')
        indicator_slugs = response_json['data'].map { |d| d['indicator'] }.uniq
        expect(indicator_slugs).not_to include('not_configured_indicator')
      end
    end

    context 'filters' do
      it 'should filter by slug' do
        get '/api/v1/indicator_values?filter[indicator]=visits_by_origin'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicator-values-filter-by-slug')
      end
    end

    context 'sparse fieldset' do
      it 'should work' do
        get '/api/v1/indicator_values?fields=indicator,date,value'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/indicator-values-sparse-fieldset')
      end
    end
  end
end
