require 'system_helper'

RSpec.describe 'Regions', type: :system do
  let_it_be(:admin) { create(:user, email: 'admin@example.com', password: 'secret', name: 'Admin Example') }

  before { sign_in admin }

  describe 'Index' do
    before do
      bc = create(:region, :province, name: 'British Columbia')
      create(:region, name: 'Thompson Okanagan', parent: bc)
    end
    before { visit '/admin/regions' }

    it 'displays regions' do
      expect(page).to have_text('British Columbia')
      expect(page).to have_text('Thompson Okanagan')
    end
  end

  describe 'Edit' do
    before do
      create(:region, :province, name: 'British Columbia', active: false)
    end
    before { visit '/admin/regions' }

    it 'updates region' do
      within_row('British Columbia') do
        click_on 'Actions'
        click_on 'Edit'
      end

      fill_in :region_name, with: 'New British Columbia'
      check 'Active'

      click_on 'Update Region'

      expect(page).to have_text('Region was successfully updated')
      within_row('New British Columbia') do
        expect(page).to have_text('Yes')
      end
    end
  end
end
