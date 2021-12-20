require 'system_helper'

RSpec.describe 'Themes & Widgets', type: :system do
  let_it_be(:admin) { create(:admin, email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin Example') }

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
        build(
          :widget,
          title: 'Occupancy rates',
          sources: [
            build(:source, text: 'Source 1'),
            build(:source, text: 'Source 2')
          ]
        ),
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

      expect(page).to have_selector("input[value='Source 1']")
      # Remove Source 1
      within(first('div.nested-fields')) do
        click_on 'Remove'
      end
      # Change text for Source 2
      within(first('div.nested-fields')) do
        first('div.widget_sources_text input').fill_in with: 'Source Changes'
      end
      # Add new Source
      click_on 'Add Source'
      within(last('div.nested-fields')) do
        first('div.widget_sources_text input').fill_in with: 'New Source'
      end

      click_on 'Update Widget'
      expect(page).to have_text('Widget was successfully updated')

      within_card('Widgets') do
        find_row('Changed Occupancy rates').click
      end

      expect(page).to have_selector("input[value='Source Changes']")
      expect(page).to have_selector("input[value='New Source']")
      expect(page).not_to have_selector("input[value='Source 1']")
      expect(page).not_to have_selector("input[value='Source 2']")
    end
  end
end
