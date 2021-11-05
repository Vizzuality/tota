require 'system_helper'

RSpec.describe 'Auth', type: :system do
  let_it_be(:admin) { create(:user, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  describe 'Login' do
    before { visit '/admin/users' }

    it 'authenticate user successfuly' do
      fill_in :user_email, with: 'admin@example.com'
      fill_in :user_password, with: 'SuperSecret6'

      click_on 'Sign in'

      expect(page).to have_text('Users')
    end

    it 'provide wrong password' do
      fill_in :user_email, with: 'admin@example.com'
      fill_in :user_password, with: 'secret3'

      click_on 'Sign in'

      expect(page).to have_text('Invalid Email or password')
    end
  end

  describe 'Log out' do
    before { sign_in admin }

    it 'works well' do
      visit '/admin/users'

      click_on admin.email
      click_on 'Log out'

      expect(page).to have_current_path(new_user_session_path)
    end
  end
end
