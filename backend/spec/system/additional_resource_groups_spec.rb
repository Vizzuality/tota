require 'system_helper'

RSpec.describe 'Additional Resource Groups', type: :system do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  before { sign_in admin }

  describe 'Index' do
    before { @group = create(:additional_resource_group, name: 'Group 1') }
    before { visit '/admin/additional_resource_groups' }

    it 'displays groups' do
      expect(page).to have_text(@group.name)
    end
  end

  describe 'Edit' do
    before { @group = create(:additional_resource_group, name: 'Group 1') }
    before { visit '/admin/additional_resource_groups' }

    it 'updates region' do
      within_row(@group.name) do
        click_on 'Actions'
        click_on 'Edit'
      end

      fill_in :additional_resource_group_name, with: 'New Group name'
      click_on 'Update Additional resource group'

      expect(page).to have_text('Additional Resource Group was successfully updated')
      expect(page).to have_text('New Group name')
    end
  end

  describe 'Create' do
    before {
      create(:additional_resource_group, name: 'Group 1')
      visit '/admin/additional_resource_groups'
    }

    it 'creates new group' do
      click_on 'New Group'

      fill_in :additional_resource_group_name, with: 'New Group name'

      click_on 'Create Additional resource group'

      expect(page).to have_text('Additional Resource Group was successfully created')
      within_row('New Group name') do
        expect(page).to have_text('2') # second position
      end
    end

    context 'errors' do
      it 'displays validation errors' do
        click_on 'New Group'

        click_on 'Create Additional resource group'

        expect(page).to have_text('Please review the problems below')
        expect(page).to have_text("Name can't be blank")
      end
    end
  end

  describe 'Destroy' do
    before {
      @group = create(:additional_resource_group, name: 'Group 1')
      @resource = create(:additional_resource, group: @group, title: 'Resource 1')
    }
    before { visit '/admin/additional_resource_groups' }

    it 'destroys group and clears for existing resources' do
      within_row(@group.name) do
        click_on 'Actions'
        accept_confirm do
          click_on 'Delete'
        end
      end

      expect(page).to have_text('Additional Resource Group was successfully destroyed')
      expect(page).not_to have_text('Group 1')

      visit '/admin/additional_resources'

      within_row('Resource 1') do
        expect(page).to have_text('Not assigned (Others)') # clears group for existing resources
      end
    end
  end
end
