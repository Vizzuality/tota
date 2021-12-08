class Source
  include StoreModel::Model

  attr_accessor :_destroy

  attribute :text, :string
  attribute :link, :string
  attribute :note, :string

  validates_presence_of :text
  validates :link, url: true
end
