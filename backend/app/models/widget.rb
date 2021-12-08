class Widget < ApplicationRecord
  belongs_to :theme
  attribute :sources, Source.to_array_type

  validates_presence_of :slug, :title
  validates_uniqueness_of :slug
  validates :sources, store_model: true, allow_nil: true

  def sources_attributes=(attr)
    self.sources = attr.values.reject { |a| ActiveModel::Type::Boolean.new.cast(a[:_destroy]) }
  end
end
