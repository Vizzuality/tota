require 'system_helper'

RSpec.describe 'Data Uploads', type: :system do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  before { sign_in admin }

  describe 'Upload' do
    before { visit '/admin/data_uploads' }

    context 'success' do
      before { create(:region, name: 'Thompson Okanagan') }

      it 'uploads a new file' do
        click_on 'New Data Upload'

        select 'Indicators', from: :data_upload_uploader
        sleep 0.3 # dunno why have to wait on CI
        attach_file :data_upload_file, Rails.root.join('spec/fixtures/files/csv/indicator_values_proper.csv')
        click_on 'Upload'

        expect(page).to have_text('File was successfully imported')

        within_row('IndicatorValues upload') do
          expect(page).to have_text('indicator_values_proper.csv')
          expect(page).to have_text('admin@example.com')
        end
      end
    end

    context 'errors' do
      it 'displays validation errors' do
        allow_any_instance_of(Kernel).to receive(:warn) # suppress warning message

        click_on 'New Data Upload'

        select 'Indicators', from: :data_upload_uploader
        sleep 0.3 # dunno why have to wait on CI
        attach_file :data_upload_file, Rails.root.join('spec/fixtures/files/csv/indicator_values_proper.csv')
        click_on 'Upload'

        expect(page).to have_text('Please review the problems below')
        expect(page).to have_text('Error on row 1: Cannot find region with name Thompson Okanagan.')
        expect(page).to have_text('Error on row 2: Cannot find region with name Thompson Okanagan.')
        expect(page).to have_text('Error on row 3: Cannot find region with name Thompson Okanagan.')
        expect(page).to have_text('Error on row 4: Cannot find region with name Thompson Okanagan.')
      end
    end
  end
end
