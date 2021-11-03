require 'system_helper'

RSpec.describe 'Development Funds', type: :system do
  let_it_be(:admin) { create(:user, email: 'admin@example.com', password: 'secret', name: 'Admin Example') }

  before { sign_in admin }

  describe 'Index' do
    before do
      create(:development_fund, project_title: 'Project Number 1')
      create(:development_fund, project_title: 'Project Number 2')
    end
    before { visit '/admin/development_funds' }

    it 'displays development funds' do
      expect(page).to have_text('Project Number 1')
      expect(page).to have_text('Project Number 2')
    end
  end
end
