class AddShowOnPlatformToOrganizations < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :show_on_platform, :boolean, default: true, null: false
  end
end
