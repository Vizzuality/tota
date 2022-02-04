require 'rails_helper'

RSpec.describe ThemesLoader do
  let(:file_path) { Rails.root.join('spec/fixtures/files/themes.yml') }
  let(:themes_config) { Rails.application.config_for(file_path) }

  context 'with empty database' do
    it 'should load all themes and widgets' do
      service = ThemesLoader.new(themes_config: themes_config)

      expect(Theme.count).to eq(0)
      expect(service.call).to be(true)
      expect(Theme.count).to eq(3)

      widgets_json = Widget.all.order(:created_at).to_json(
        only: [:title, :sub_title, :description, :note, :sources]
      )
      expect(widgets_json).to match_snapshot('services/themes-loader-empty-db')
    end
  end

  context 'with existing widgets' do
    before do
      create(
        :theme,
        slug: :airport_information,
        title: 'Airport Information old',
        widgets: [
          build(:widget, slug: :airport_arrivals, title: 'Airport arrivals old', sources: []),
          build(:widget, slug: :passenger_volume, title: 'Passenger volume', sources: []),
          build(:widget, slug: :should_be_removed, title: 'This should be removed')
        ]
      )
      create(
        :theme,
        slug: :should_be_removed,
        title: 'This theme should be removed',
        widgets: [
          build(:widget, slug: :be_removed_1, title: 'Be removed 1', sources: []),
          build(:widget, slug: :be_removed_2, title: 'Be removed 2', sources: [])
        ]
      )
    end

    it 'should load new themes, widgets and remove non existent' do
      service = ThemesLoader.new(themes_config: themes_config)

      expect(Theme.count).to eq(2)
      expect(Widget.find_by(slug: :should_be_removed).present?).to be(true)

      expect(service.call).to be(true)
      expect(Theme.count).to eq(3)
      expect(Theme.find_by(slug: :should_be_removed).present?).to be(false)
      expect(Widget.find_by(slug: :should_be_removed).present?).to be(false)
      expect(Theme.find_by(slug: :airport_information).title).to eq('Airport Information old')
      expect(Widget.find_by(slug: :airport_arrivals).title).to eq('Airport arrivals old')
      widgets_json = Widget.all.order(:created_at).to_json(
        only: [:title, :sub_title, :description, :note, :sources]
      )
      expect(widgets_json).to match_snapshot('services/themes-loader-existing-widgets')
    end

    it 'should remove existing themes and load new with cleanup option' do
      service = ThemesLoader.new(themes_config: themes_config, cleanup: true)

      expect(Theme.count).to eq(2)
      expect(Widget.find_by(slug: :should_be_removed).present?).to be(true)

      expect(service.call).to be(true)
      expect(Theme.count).to eq(3)
      expect(Theme.find_by(slug: :should_be_removed).present?).to be(false)
      expect(Widget.find_by(slug: :should_be_removed).present?).to be(false)
      expect(Theme.find_by(slug: :airport_information).title).to eq('Airport Information')
      expect(Widget.find_by(slug: :airport_arrivals).title).to eq('Number of arriving flights')

      widgets_json = Widget.all.order(:created_at).to_json(
        only: [:title, :sub_title, :description, :note, :sources]
      )
      # match the same snapshot as empty database spec
      expect(widgets_json).to match_snapshot('services/themes-loader-empty-db')
    end
  end
end
