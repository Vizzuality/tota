class AddAccessibilityToOrganizations < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :accessibility, :boolean
  end
end
