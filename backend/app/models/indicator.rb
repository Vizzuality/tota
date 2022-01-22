# == Schema Information
#
# Table name: indicators
#
#  id         :bigint           not null, primary key
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  dynamic    :boolean          default(FALSE), not null
#
class Indicator < ApplicationRecord
  has_many :indicator_values, dependent: :destroy

  scope :dynamic, -> { where(dynamic: true) }
  scope :imported, -> { where(dynamic: [nil, false]) }

  validates_presence_of :slug
  validates_uniqueness_of :slug

  def self.only_public
    private_widgets = Widget.only_private.pluck(:slug)
    private_indicators = widgets_dependecy_hash.select { |_slug, widgets| (widgets & private_widgets).any? }.keys

    where.not(slug: private_indicators)
  end

  # Which indicators are used by which widgets
  def self.widgets_dependecy_hash
    return @widgets_dependecy_hash if @widgets_dependecy_hash.present?

    widgets_dependecy_hash = {}
    Widget.config.each do |widget_slug, widget_config|
      Array.wrap(widget_config['indicators']).each do |indicator_slug|
        widgets_dependecy_hash[indicator_slug] ||= []
        widgets_dependecy_hash[indicator_slug].push(widget_slug)
      end
    end
    @widgets_dependecy_hash = widgets_dependecy_hash
  end
end
