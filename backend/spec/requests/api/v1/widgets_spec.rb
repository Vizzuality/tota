require 'rails_helper'

RSpec.describe 'API V1 Widgets', type: :request do
  before_all do
    create(:theme, :with_widgets, title: 'Theme 1', slug: 'theme_1')
    create(:theme, :with_widgets, title: 'Theme 2', slug: 'theme_2')
  end

  describe 'GET #index' do
    it 'should return widgets' do
      get '/api/v1/widgets'

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot('api/v1/widgets')
    end

    context 'filters' do
      it 'should filter by theme slug' do
        params = URI.encode_www_form('filter[theme.slug]' => 'theme_2')
        get "/api/v1/widgets?#{params}"

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/widgets-filter-by-theme-slug')
      end
    end

    context 'sparse fieldset' do
      it 'should work' do
        get '/api/v1/widgets?fields=slug,title'

        expect(response).to have_http_status(:ok)
        expect(response.body).to match_snapshot('api/v1/widgets-sparse-fieldset')
      end
    end
  end
end
