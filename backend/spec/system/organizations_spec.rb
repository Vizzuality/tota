require 'system_helper'

RSpec.describe 'Organizations', type: :system do
  let_it_be(:admin) { create(:user, email: 'admin@example.com', password: 'secret', name: 'Admin Example') }

  before { sign_in admin }

  describe 'Index' do
    before do
      create(:organization, name: 'Organization Number 1')
      create(:organization, name: 'Organization Number 2')
    end
    before { visit '/admin/organizations' }

    it 'displays organizations' do
      expect(page).to have_text('Organization Number 1')
      expect(page).to have_text('Organization Number 2')
    end
  end
end
