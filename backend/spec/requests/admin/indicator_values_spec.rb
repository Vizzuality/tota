require 'rails_helper'

RSpec.describe 'Admin Indicator Values', type: :request do
  let_it_be(:admin) { create(:user, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  let_it_be(:region) { create(:region, name: 'Region 1') }
  let_it_be(:visits_by_origin) do
    create(
      :indicator,
      slug: 'visits_by_origin',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: region),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: region),
        build(:indicator_value, date: '2020-02', category_1: 'Canada', value: '2222', region: region),
        build(:indicator_value, date: '2020-02', category_1: 'Germany', value: '2222', region: region)
      ]
    )
  end

  before { sign_in admin }

  describe 'GET #index' do
    it 'should display indicator values' do
      get admin_indicator_values_path

      expect(response).to have_http_status(:ok)
    end

    context 'csv response' do
      it 'should return csv file' do
        get admin_indicator_values_path(format: :csv)

        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('text/csv')
        # remove snapshot to update it (from spec/snapshots)
        # make sure no dynamic, sequenced entity values are used
        io = StringIO.new(response.body)
        io.set_encoding_by_bom
        csv_json = CSV.parse(io, headers: true).map(&:to_h).to_json
        expect(csv_json).to match_snapshot('admin_indicator_values_csv')
      end
    end
  end
end
