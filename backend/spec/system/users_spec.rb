require 'system_helper'

RSpec.describe 'Users', type: :system do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  before { sign_in admin }

  describe 'Index' do
    before do
      create(:user, email: 'user1@example.com', name: 'Tomasz')
      create(:user, email: 'user2@example.com', name: 'Krzysztof')
    end
    before { visit '/admin/users' }

    it 'displays users' do
      within_row('user1@example.com') do
        expect(page).to have_text('Tomasz')
      end

      within_row('user2@example.com') do
        expect(page).to have_text('Krzysztof')
      end

      within_row('admin@example.com') do
        expect(page).to have_text('Admin Example')
      end
    end
  end

  describe 'Create' do
    before { visit '/admin/users' }

    it 'creates new user' do
      click_on 'New User'

      fill_in :user_email, with: 'user@example.com'
      fill_in :user_name, with: 'Bob Example'
      fill_in :user_password, with: 'GreatSuperSecret3'
      fill_in :user_password_confirmation, with: 'GreatSuperSecret3'

      click_on 'Create User'

      expect(page).to have_text('User was successfully created')
    end

    context 'errors' do
      it 'displays validation errors' do
        click_on 'New User'

        fill_in :user_email, with: 'wrongemail'

        click_on 'Create User'

        expect(page).to have_text('Please review the problems below')
        expect(page).to have_text('Email is invalid')
        expect(page).to have_text("Password can't be blank")
      end
    end
  end

  describe 'Edit' do
    let!(:user) { create(:user, email: 'user1@example.com', name: 'Tomasz') }

    before { visit '/admin/users' }

    it 'updates details' do
      within_row('user1@example.com') do
        click_on 'Actions'
        click_on 'Edit'
      end

      fill_in :user_name, with: 'New User Name'

      click_on 'Update User'

      expect(page).to have_text('User was successfully updated')
      within_row('user1@example.com') do
        expect(page).to have_text('New User Name')
      end
    end

    it 'updates password' do
      within_row('user1@example.com') do
        click_on 'Actions'
        click_on 'Edit'
      end

      fill_in :user_password, with: 'NewPassword666'
      fill_in :user_password_confirmation, with: 'NewPassword666'

      click_on 'Update User'

      expect(page).to have_text('User was successfully updated')

      click_on admin.email
      click_on 'Log out'

      expect(page).to have_current_path(new_user_session_path)

      fill_in :user_email, with: 'user1@example.com'
      fill_in :user_password, with: 'NewPassword666'

      click_on 'Sign in'

      expect(page).to have_current_path(admin_dashboards_path)
    end

    context 'permissions' do
      before { visit edit_admin_user_path(user) }

      it 'updates admin field' do
        expect(page).to have_select(:user_account_type, selected: 'User')

        select 'Admin', from: :user_account_type
        sleep 0.3 # dunno why have to wait on CI
        click_on 'Update User'

        within_row('user1@example.com') do
          expect(page).to have_text('Yes')
        end
      end

      context 'single regions' do
        before do
          create(:region, name: 'Region 1')
          create(:region, name: 'Region 2')
          create(:region, name: 'Region 3')
        end
        before { visit edit_admin_user_path(user) }

        it 'updates regional permissions' do
          check 'Region 1'
          check 'Region 3'

          click_on 'Update User'

          expect(page).to have_text('User was successfully updated')

          within_row('user1@example.com') do
            click_on 'Actions'
            click_on 'Edit'
          end

          expect(page).to have_checked_field('Region 1')
          expect(page).to have_unchecked_field('Region 2')
          expect(page).to have_checked_field('Region 3')
        end
      end
    end

    context 'errors' do
      before { visit edit_admin_user_path(user) }

      it 'displays validation errors' do
        fill_in :user_email, with: 'wrongemail'

        click_on 'Update User'

        expect(page).to have_text('Please review the problems below')
        expect(page).to have_text('Email is invalid')
      end
    end
  end
end
