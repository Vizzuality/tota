# == Schema Information
#
# Table name: themes
#
#  id          :bigint           not null, primary key
#  slug        :string           not null
#  title       :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Theme < ApplicationRecord
  has_many :widgets

  validates_presence_of :slug, :title
  validates_uniqueness_of :slug

  def config
    Theme.config[slug]
  end

  class << self
    def load_config(cleanup: false)
      ThemesLoader.new(path: Rails.root.join('config/themes.yml'), cleanup: cleanup).call
    end

    def config
      Rails.application.config.themes[:themes].to_h { |t| [t[:slug], t] }.with_indifferent_access
    end
  end
end
