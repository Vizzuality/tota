require 'rails_helper'

RSpec.describe 'API V1 Organizations', type: :request do
  before_all do
    tota = create(:region, name: 'Thompson Okanagan')
    region1 = create(:region, name: 'North Okanagan', parent: tota)
    region2 = create(:region, name: 'Central Okanagan', parent: tota)
    business_type = create(:business_type, name: 'Accommodation')
    subtype1 = create(:business_type, name: 'Motel', parent: business_type)

    create(:organization, name: 'Summit River Lodge And Campsites', region: region1, business_type: business_type)
    create(:organization, name: 'Double E Sportsman Camp', region: region2, business_type: subtype1)
  end

  describe 'GET #index' do
    it 'should return organizations' do
      get '/api/v1/organizations'

      expect(response).to have_http_status(:ok)
      expect(response.body).to match_snapshot('api/v1/organizations')
    end
  end
end
