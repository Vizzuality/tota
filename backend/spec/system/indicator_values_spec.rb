require 'system_helper'

RSpec.describe 'Indicator Values', type: :system do
  let_it_be(:admin) { create(:user, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }
  let_it_be(:visits_by_origin) do
    create(
      :indicator,
      slug: 'visits_by_origin',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '33434', region: @r1),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: @r1)
      ]
    )
  end
  let_it_be(:stays_by_origin) {
    create(
      :indicator,
      slug: 'stays_by_origin',
      indicator_values: [
        build(:indicator_value, date: '2020-01', category_1: 'Canada', value: '11111', region: @r1),
        build(:indicator_value, date: '2020-01', category_1: 'Germany', value: '33333', region: @r1)
      ]
    )
  }

  before { sign_in admin }

  describe 'Index' do
    before { visit '/admin/indicator_values' }

    it 'displays indicator values' do
      expect(page).to have_text('stays_by_origin')
      expect(page).to have_text('visits_by_origin')
    end
  end
end
