require 'rails_helper'

RSpec.describe 'API V1 Indicators', type: :request do
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
  end
end
