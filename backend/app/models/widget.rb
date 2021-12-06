class Widget < ApplicationRecord
  belongs_to :theme

  validates_presence_of :slug, :title
end
