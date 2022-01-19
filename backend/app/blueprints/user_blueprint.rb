class UserBlueprint < Blueprinter::Base
  identifier :email

  fields :name, :account_type
end
