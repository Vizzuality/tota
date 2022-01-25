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

  STATS_INDICATORS = %w[
    size_tourism_region_km2
    population_by_tourism_region
    tourism_employment_by_tourism_region_monthly
    total_employment_by_tourism_region_monthly
  ].freeze

  def self.only_public
    # indicators used for main header stats, must be public
    public_widgets = Widget.only_public.pluck(:slug)
    public_indicators = Widget.config.slice(*public_widgets).flat_map { |_slug, config| Array.wrap(config['indicators']) }
    public_indicators = (public_indicators + STATS_INDICATORS).uniq
    where(slug: public_indicators)
  end

  # Indicators that are configured for any widget in themes.yml file
  def self.only_configured
    configured = Widget.config.flat_map { |_slug, config| Array.wrap(config['indicators']) }
    configured = (configured + STATS_INDICATORS).uniq
    where(slug: configured)
  end
end
