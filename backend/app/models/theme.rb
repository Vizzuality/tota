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
    Theme.config[slug]&.with_indifferent_access
  end

  class << self
    def load_config(cleanup: false)
      ThemesLoader.new(path: Rails.root.join('config/themes.yml'), cleanup: cleanup).call
    end

    def config
      content = YAML.safe_load(Rails.root.join('config/themes.yml').read)
      @config ||= content['themes'].to_h { |t| [t['slug'], t] }
    end
  end
end
