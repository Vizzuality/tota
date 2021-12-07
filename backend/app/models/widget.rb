class Widget < ApplicationRecord
  belongs_to :theme
  attribute :sources, Source.to_array_type

  validates_presence_of :slug, :title
  validates :sources, store_model: true

  def sources_attributes=(attr)
    self.sources = attr.values
  end
end
