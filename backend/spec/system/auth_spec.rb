require 'system_helper'

RSpec.describe 'Auth', type: :system do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

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

  describe 'Password Reset' do
    it 'works well' do
      visit '/admin'

      expect(page).to have_text('You need to sign in or sign up before continuing.')

      click_on 'Forgot your password?'

      fill_in :user_email, with: 'admin@example.com'
      click_on 'Send me reset password instructions'

      email = last_email_to(admin.email)
      expect(email.subject).to eq('Reset password instructions')

      path_regex = /(?:"https?\:\/\/.*?)(\/.*?)(?:")/
      reset_link = email.body.match(path_regex)[1]

      visit reset_link

      expect(page).to have_text('Change your password')

      fill_in :user_password, with: 'SuperSecret666'
      fill_in :user_password_confirmation, with: 'SuperSecret666'
      click_on 'Change my password'

      expect(page).to have_text('Your password has been changed successfully. You are now signed in.')
    end
  end
end
