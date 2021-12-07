class Source
  include StoreModel::Model

  attribute :text, :string
  attribute :link, :string
  attribute :note, :string

  validates_presence_of :text
end
