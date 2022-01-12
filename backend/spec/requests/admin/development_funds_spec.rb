require 'rails_helper'

RSpec.describe 'Admin Development Funds', type: :request do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  before_all do
    tota = create(:region, name: 'Thompson Okanagan')
    bc = create(:region, name: 'British Columbia')

    create_list(:development_fund, 4, region: tota)
    create_list(:development_fund, 2, region: bc)
    create(:development_fund, region: tota, project_title: 'Super project')
  end

  before { sign_in admin }

  describe 'GET #index' do
    it 'should display development funds' do
      get admin_development_funds_path

      expect(response).to have_http_status(:ok)
      expect(response.body).to include('Super project')
    end

    context 'csv response' do
      it 'should return csv file' do
        get admin_development_funds_path(format: :csv)

        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('text/csv')
        # remove snapshot to update it (from spec/snapshots)
        # make sure no dynamic, sequenced entity values are used
        io = StringIO.new(response.body)
        io.set_encoding_by_bom
        csv_json = CSV.parse(io, headers: true).map(&:to_h).to_json
        expect(csv_json).to match_snapshot('admin_development_funds_csv')
      end
    end
  end
end
