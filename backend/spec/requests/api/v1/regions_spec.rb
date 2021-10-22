require 'rails_helper'

RSpec.describe 'API V1 Regions', type: :request do
  before_all do
    bc = create(:region, name: 'British Columbia')
    tota = create(:region, name: 'Thompson Okanagan', parent: bc)
    create(:region, name: 'North Okanagan', parent: tota)
    create(:region, name: 'Central Okanagan', parent: tota)
  end

  describe 'GET #index' do
    it 'should return regions' do
      get '/api/v1/regions'

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot('api/v1/regions', dynamic_attributes: %w(parent_id))
    end

    context 'filters' do
      it 'should filter by slug' do
        params = URI.encode_www_form('filter[slug]' => 'british_columbia')
        get "/api/v1/regions?#{params}"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/regions-filter-by-slug', dynamic_attributes: %w(parent_id))
      end
    end

    context 'sparse fieldset' do
      it 'should work' do
        get '/api/v1/regions?fields=id,slug,name'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/regions-sparse-fieldset')
      end
    end
  end
end
