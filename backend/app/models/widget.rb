# == Schema Information
#
# Table name: widgets
#
#  id          :bigint           not null, primary key
#  theme_id    :bigint           not null
#  slug        :string           not null
#  title       :string           not null
#  sub_title   :string
#  description :text
#  note        :text
#  sources     :jsonb
#  position    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Widget < ApplicationRecord
  belongs_to :theme

  acts_as_list scope: :theme, top_of_list: 0

  attribute :sources, Source.to_array_type

  validates_presence_of :slug, :title
  validates_uniqueness_of :slug
  validates :sources, store_model: true, allow_nil: true

  scope :only_public, -> { where(public: true) }
  scope :only_private, -> { where(public: false) }

  def sources_attributes=(attr)
    self.sources = attr.values.reject { |a| ActiveModel::Type::Boolean.new.cast(a[:_destroy]) }
  end

  def private?
    !public?
  end

  def config
    Widget.config[slug]&.with_indifferent_access
  end

  class << self
    def config
      @config ||= Theme.config.values.flat_map { |t| t['widgets'] }.to_h { |w| [w['slug'], w] }
    end

    def reset_config
      @config = nil
    end
  end
end
