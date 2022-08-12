require 'rails_helper'

RSpec.describe 'API V1 Additional Resources', type: :request do
  before_all do
    @thompson_okanagan = create(:region, slug: 'thompson_okanagan', name: 'Thompson Okanagan')
    @northern_bc = create(:region, slug: 'northern_bc', name: 'Northern BC')

    @group_1 = create(:additional_resource_group)
    @group_2 = create(:additional_resource_group)

    create_list(:additional_resource, 2, group: @group_1, region: @thompson_okanagan)
    create_list(:additional_resource, 2, group: @group_2, region: @thompson_okanagan)
    create_list(:additional_resource, 2, group: @group_1, region: @northern_bc)
    @private_resource = create(:additional_resource, :private, title: 'Private Thompson res', group: @group_1, region: @thompson_okanagan)
    @private_resource_2 = create(:additional_resource, :private, title: 'Private Northern res', group: @group_1, region: @northern_bc)
  end

  describe 'GET #index' do
    context 'filters' do
      it 'should filter by region slug' do
        params = URI.encode_www_form('filter[regions.slug]' => 'thompson_okanagan')
        get "/api/v1/additional_resources?#{params}"

        expect(response).to have_http_status(:ok)
        expect(response_json['data'].length).to eq(4)
        expect(response.body).to match_snapshot('api/v1/additional-resources-filter-by-region-slug')
      end
    end

    context 'guest user' do
      it 'should return public additional resources' do
        get '/api/v1/additional_resources'

        expect(response).to have_http_status(:ok)
        expect(response_json['data'].length).to eq(6)
        expect(response.body).to match_snapshot('api/v1/guest-additional-resources')
      end
    end

    context 'admin user' do
      before(:each) do
        admin = create(:admin)
        sign_in admin
      end

      it 'should return all additional resources' do
        get '/api/v1/additional_resources'

        expect(response).to have_http_status(:ok)
        expect(response_json['data'].length).to eq(8)
      end
    end

    context 'normal user' do
      let(:user) { create(:user, regions: [@thompson_okanagan]) }
      before(:each) { sign_in user }

      it 'should return all for user region' do
        get '/api/v1/additional_resources'

        expect(response).to have_http_status(:ok)
        expect(response_json['data'].length).to eq(7)
        expect(response.body).to match_snapshot('api/v1/user-additional-resources')
      end
    end
  end
end
