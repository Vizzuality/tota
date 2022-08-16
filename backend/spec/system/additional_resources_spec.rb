require 'system_helper'

RSpec.describe 'Additional Resources', type: :system do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }
  let_it_be(:group) { create(:additional_resource_group, name: 'Group') }
  let_it_be(:province) { create(:region, :province, name: 'British Columbia') }
  let_it_be(:region) { create(:region, name: 'Thompson Okanagan', parent: province) }

  before { sign_in admin }

  describe 'Index' do
    before do
      create(:additional_resource, title: 'Resource 1', group: group, region: province)
      create(:additional_resource, title: 'Resource 2', group: nil, region: region, public: false)
      visit '/admin/additional_resources'
    end

    it 'displays groups' do
      within_row('Resource 1') do
        expect(page).to have_text('Group')
        expect(page).to have_text('British Columbia')
        expect(page).to have_text('Public')
      end

      within_row('Resource 2') do
        expect(page).to have_text('Not assigned (Others)')
        expect(page).to have_text('Thompson Okanagan')
        expect(page).to have_text('Private')
      end
    end
  end

  describe 'Edit' do
    before do
      create(:additional_resource, title: 'Resource 1', group: group, region: province)
      create(:additional_resource, title: 'Resource 2', group: nil, region: region, public: false)
      visit '/admin/additional_resources'
    end

    it 'updates region' do
      within_row('Resource 2') do
        click_on 'Actions'
        click_on 'Edit'
      end

      fill_in :additional_resource_title, with: 'New Resource Title'
      select 'Group', from: :additional_resource_group_id
      select 'British Columbia', from: :additional_resource_region_id
      select 'Public', from: :additional_resource_public
      fill_in :additional_resource_link, with: 'https://new.example.com'

      click_on 'Update Additional resource'

      expect(page).to have_text('Additional Resource was successfully updated')
      within_row('New Resource Title') do
        expect(page).to have_text('Group')
        expect(page).to have_text('British Columbia')
        expect(page).to have_text('Public')
        expect(page).to have_link(nil, href: 'https://new.example.com')
      end
    end
  end

  describe 'Create' do
    before do
      visit '/admin/additional_resources'
    end

    it 'creates resource' do
      click_on 'New Resource'

      fill_in :additional_resource_title, with: 'New Resource Title'
      select 'Group', from: :additional_resource_group_id
      select 'British Columbia', from: :additional_resource_region_id
      select 'Public', from: :additional_resource_public
      attach_file :additional_resource_file, Rails.root.join('spec/fixtures/files/test.pdf')

      click_on 'Create Additional resource'

      expect(page).to have_text('Additional Resource was successfully created')
      within_row('New Resource Title') do
        expect(page).to have_text('Group')
        expect(page).to have_text('British Columbia')
        expect(page).to have_text('Public')
        expect(page).to have_link(nil, href: AdditionalResource.find_by(title: 'New Resource Title').url)
      end
    end

    context 'errors' do
      it 'displays validation errors' do
        click_on 'New Resource'

        fill_in :additional_resource_title, with: 'New Resource Title'
        select 'Group', from: :additional_resource_group_id
        select 'Public', from: :additional_resource_public
        fill_in :additional_resource_link, with: 'https://new.example.com'
        attach_file :additional_resource_file, Rails.root.join('spec/fixtures/files/test.pdf')

        click_on 'Create Additional resource'

        expect(page).to have_text('Please review the problems below')
        expect(page).to have_text('Please assign link or attach file, but not both')
        expect(page).to have_text('Region must exist')
      end
    end
  end

  describe 'Destroy' do
    before do
      create(:additional_resource, title: 'Resource 1', group: group, region: province)
      visit '/admin/additional_resources'
    end

    it 'destroys resource' do
      within_row('Resource 1') do
        click_on 'Actions'
        accept_confirm do
          click_on 'Delete'
        end
      end

      expect(page).to have_text('Additional Resource was successfully destroyed')
      expect(page).not_to have_text('Resource 1')
    end
  end
end
