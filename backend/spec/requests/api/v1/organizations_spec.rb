require 'rails_helper'

RSpec.describe 'API V1 Organizations', type: :request do
  before_all do
    tota = create(:region, name: 'Thompson Okanagan')
    region1 = create(:region, :tourism_subregion, name: 'North Okanagan', parent: tota)
    region2 = create(:region, :tourism_subregion, name: 'Central Okanagan', parent: tota)
    business_type = create(:business_type, name: 'Accommodation')
    subtype1 = create(:business_type, name: 'Motel', parent: business_type)

    create(:organization, name: 'Summit River Lodge And Campsites', region: region1, business_type: business_type)
    create(:organization, name: 'Double E Sportsman Camp', region: region2, business_type: subtype1)
  end

  context 'json response' do
    describe 'GET #index' do
      it 'should return organizations' do
        get '/api/v1/organizations'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/organizations')
      end

      context 'filters' do
        it 'should filter by name' do
          params = URI.encode_www_form('filter[name]' => 'Double E Sportsman Camp')
          get "/api/v1/organizations?#{params}"

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/organizations-filter-by-name')
        end
      end

      context 'sparse fieldset' do
        it 'should work' do
          get '/api/v1/organizations?fields=id,region'

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/organizations-sparse-fieldset')
        end
      end
    end
  end

  context 'geojson response' do
    describe 'GET #index' do
      it 'should return organizations' do
        get '/api/v1/organizations.geojson'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/organizations-geojson')
      end

      context 'filters' do
        it 'should filter by name' do
          params = URI.encode_www_form('filter[name]' => 'Double E Sportsman Camp')
          get "/api/v1/organizations.geojson?#{params}"

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/organizations-geojson-filter-by-name')
        end
      end

      context 'sparse fieldset' do
        it 'should work' do
          get '/api/v1/organizations.geojson?fields=id,region'

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/organizations-geojson-sparse-fieldset')
        end
      end
    end
  end
end
