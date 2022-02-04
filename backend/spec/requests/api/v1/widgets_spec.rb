require 'rails_helper'

RSpec.describe 'API V1 Widgets', type: :request do
  before_all do
    @theme_1 = create(:theme, :with_widgets, title: 'Theme 1', slug: 'theme_1')
    create(:theme, :with_widgets, title: 'Theme 2', slug: 'theme_2')
    @thompson_okanagan = create(:region, slug: 'thompson_okanagan', name: 'Thompson Okanagan')
    @northern_bc = create(:region, slug: 'northern_bc', name: 'Northern BC')
    @private_widget = @theme_1.widgets.second
    @private_widget.update(public: false)
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

    describe 'regions whitelist' do
      let(:widget) { @theme_1.widgets.first }

      before(:each) do
        allow(Theme).to receive(:config).and_return({
          theme_1: {
            slug: 'theme_1',
            widgets: [{
              slug: widget.slug,
              regions_whitelist: ['thompson_okanagan']
            }]
          }
        }.with_indifferent_access)
        Widget.reset_config
      end
      after(:each) do
        Widget.reset_config
      end

      context 'guest user' do
        it 'should include whitelisted regions from config' do
          get '/api/v1/widgets?filter[slug]=' + widget.slug

          expect(response).to have_http_status(:ok)
          expect(response_json['data'][0]).to include('regions_whitelist' => ['thompson_okanagan'])
        end
      end

      context 'admin user' do
        before(:each) do
          admin = create(:admin)
          sign_in admin
        end

        it 'should include whitelisted regions from config' do
          get '/api/v1/widgets?filter[slug]=' + widget.slug

          expect(response).to have_http_status(:ok)
          expect(response_json['data'][0]).to include('regions_whitelist' => ['thompson_okanagan'])
        end
      end

      context 'normal user' do
        let(:user) { create(:user) }
        before(:each) { sign_in user }

        context 'private widget' do
          before(:each) { widget.update(public: false) }
          after(:each) { widget.update(public: true) }

          it 'should return empty regions_whitelist when not having access to any region' do
            get '/api/v1/widgets?filter[slug]=' + widget.slug

            expect(response).to have_http_status(:ok)
            expect(response_json['data'][0]).to include('regions_whitelist' => [])
          end

          it 'should return regions_whitelist union with user visible regions' do
            user.regions << @thompson_okanagan
            user.regions << @northern_bc

            get '/api/v1/widgets?filter[slug]=' + widget.slug
            expect(response).to have_http_status(:ok)
            expect(response_json['data'][0]).to include('regions_whitelist' => ['thompson_okanagan'])
          end

          it 'should return visible regions if no whitelist' do
            user.regions << @northern_bc

            get '/api/v1/widgets?filter[slug]=' + @private_widget.slug
            expect(response).to have_http_status(:ok)
            expect(response_json['data'][0]).to include('regions_whitelist' => ['northern_bc'])
          end
        end

        context 'public widget' do
          it 'should include whitelisted regions from config' do
            get '/api/v1/widgets?filter[slug]=' + widget.slug

            expect(response).to have_http_status(:ok)
            expect(response_json['data'][0]).to include('regions_whitelist' => ['thompson_okanagan'])
          end
        end
      end
    end
  end
end
