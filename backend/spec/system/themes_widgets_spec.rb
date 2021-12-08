require 'system_helper'

RSpec.describe 'Themes & Widgets', type: :system do
  let_it_be(:admin) { create(:user, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

  before do
    create(
      :theme,
      title: 'General Insights',
      description: 'General Insights description',
      widgets: [
        build(:widget, title: 'Population', description: 'Population description'),
        build(:widget, title: 'Size'),
        build(:widget, title: 'GDP Total')
      ]
    )
    create(
      :theme,
      title: 'Accommodation',
      description: 'Accommodation description',
      widgets: [
        build(:widget, title: 'Occupancy rates'),
        build(:widget, title: 'Average daily hotel rate')
      ]
    )
  end

  before { sign_in admin }

  describe 'Themes Index' do
    before { visit '/admin/themes' }

    it 'displays themes' do
      expect(page).to have_text('General Insights')
      expect(page).to have_text('General Insights description')
      expect(page).to have_text('Accommodation')
      expect(page).to have_text('Accommodation description')
    end
  end

  describe 'Show Theme' do
    before { visit '/admin/themes' }

    it 'shows theme details' do
      # default action on click show details
      find_row('General Insights').click

      within_card('Details') do
        expect(page).to have_text('General Insights')
        expect(page).to have_text('General Insights description')
      end

      within_card('Widgets') do
        expect(page).to have_text('Population')
        expect(page).to have_text('Size')
        expect(page).to have_text('GDP Total')
      end
    end
  end

  describe 'Edit Theme' do
    before { visit '/admin/themes' }

    it 'edit theme details' do
      within_row('General Insights') do
        click_on 'Actions'
        click_on 'Edit'
      end

      fill_in :theme_title, with: 'General Insights Changed Name'

      click_on 'Update Theme'

      expect(page).to have_text('Theme was successfully updated')
      expect(page).to have_text('General Insights Changed Name')
    end
  end

  describe 'Edit Widget' do
    before { visit '/admin/themes' }

    it 'edit theme details' do
      # default action on click show details
      find_row('Accommodation').click

      within_card('Widgets') do
        find_row('Occupancy rates').click
      end

      fill_in :widget_title, with: 'Changed Occupancy rates'

      click_on 'Update Widget'
      expect(page).to have_text('Widget was successfully updated')

      within_card('Widgets') do
        expect(page).to have_text('Changed Occupancy rates')
      end
    end
  end
end
