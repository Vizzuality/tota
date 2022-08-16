class AdditionalResourceBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :url

  field :group do |val|
    val.group&.name || 'Others'
  end
end
