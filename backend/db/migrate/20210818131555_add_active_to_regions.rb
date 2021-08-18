class AddActiveToRegions < ActiveRecord::Migration[6.1]
  def change
    add_column :regions, :active, :boolean, default: true
  end
end
