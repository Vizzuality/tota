require 'rails_helper'

RSpec.describe 'API V1 Themes', type: :request do
  before_all do
    create(:theme, title: 'Theme 1', slug: 'theme_1')
    create(:theme, title: 'Theme 2', slug: 'theme_2')
    create(:theme, title: 'Theme 3', slug: 'theme_3')
  end

  describe 'GET #index' do
    it 'should return themes' do
      get '/api/v1/themes'

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot('api/v1/themes')
    end

    context 'filters' do
      it 'should filter by slug' do
        params = URI.encode_www_form('filter[slug]' => 'theme_2')
        get "/api/v1/themes?#{params}"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/themes-filter-by-slug')
      end
    end

    context 'sparse fieldset' do
      it 'should work' do
        get '/api/v1/themes?fields=slug'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/themes-sparse-fieldset')
      end
    end
  end
end
