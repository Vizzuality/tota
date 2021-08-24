require 'rails_helper'

RSpec.describe 'API V1 Development Funds', type: :request do
  before_all do
    tota = create(:region, name: 'Thompson Okanagan')
    bc = create(:region, name: 'British Columbia')

    create_list(:development_fund, 4, region: tota)
    create_list(:development_fund, 2, region: bc)
    create(:development_fund, region: tota, project_title: 'Super project')
  end

  context 'json response' do
    describe 'GET #index' do
      it 'should return development_funds' do
        get '/api/v1/development_funds'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/development_funds', dynamic_attributes: %w(region_id))
      end

      context 'filters' do
        it 'should filter by name' do
          params = URI.encode_www_form('filter[project_title]' => 'Super project')
          get "/api/v1/development_funds?#{params}"

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/development_funds-filter-by-name', dynamic_attributes: %w(region_id))
        end
      end

      context 'sparse fieldset' do
        it 'should work' do
          get '/api/v1/development_funds?fields=id,region,project_title'

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/development_funds-sparse-fieldset')
        end
      end
    end
  end

  context 'geojson response' do
    describe 'GET #index' do
      it 'should return development_funds' do
        get '/api/v1/development_funds.geojson'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/development_funds-geojson', dynamic_attributes: %w(region_id))
      end

      context 'filters' do
        it 'should filter by name' do
          params = URI.encode_www_form('filter[project_title]' => 'Super project')
          get "/api/v1/development_funds.geojson?#{params}"

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot(
            'api/v1/development_funds-geojson-filter-by-name', dynamic_attributes: %w(region_id)
          )
        end
      end

      context 'sparse fieldset' do
        it 'should work' do
          get '/api/v1/development_funds.geojson?fields=id,region,project_title'

          expect(response).to have_http_status(:ok)
          expect(response.body).to match_snapshot('api/v1/development_funds-geojson-sparse-fieldset')
        end
      end
    end
  end
end
