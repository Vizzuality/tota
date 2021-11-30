class AddSourceToOrganizations < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :source, :string
  end
end
