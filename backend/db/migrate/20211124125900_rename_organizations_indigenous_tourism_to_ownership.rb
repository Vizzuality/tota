class RenameOrganizationsIndigenousTourismToOwnership < ActiveRecord::Migration[6.1]
  def change
    rename_column :organizations, :indigenous_tourism, :indigenous_ownership
  end
end
