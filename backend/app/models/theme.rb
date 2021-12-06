class Theme < ApplicationRecord
  has_many :widgets

  validates_presence_of :slug, :title

  class << self
    def load_config
      ThemesLoader.new(Rails.root.join('config/themes.yml')).call
    end
  end
end
