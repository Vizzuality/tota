require 'rails_helper'

RSpec.describe 'Admin Organizations', type: :request do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  before_all do
    tota = create(:region, name: 'Thompson Okanagan')
    region1 = create(:region, :tourism_subregion, name: 'North Okanagan', parent: tota)
    region2 = create(:region, :tourism_subregion, name: 'Central Okanagan', parent: tota)
    business_type1 = create(:business_type, name: 'Accommodation')
    business_type2 = create(:business_type, name: 'Motel')

    create(:organization, name: 'Summit River Lodge And Campsites', region: region1, business_type_1: business_type1)
    create(:organization, name: 'Double E Sportsman Camp', region: region2, business_type_1: business_type1, business_type_2: business_type2)
  end

  before { sign_in admin }

  describe 'GET #index' do
    it 'should display organizations' do
      get admin_organizations_path

      expect(response).to have_http_status(:ok)
      expect(response.body).to include('Summit River Lodge And Campsites')
      expect(response.body).to include('Double E Sportsman Camp')
    end

    context 'csv response' do
      it 'should return csv file' do
        get admin_organizations_path(format: :csv)

        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('text/csv')
        # remove snapshot to update it (from spec/snapshots)
        # make sure no dynamic, sequenced entity values are used
        io = StringIO.new(response.body)
        io.set_encoding_by_bom
        csv_json = CSV.parse(io, headers: true).map(&:to_h).to_json
        expect(csv_json).to match_snapshot('admin_organizations_csv')
      end
    end
  end
end
