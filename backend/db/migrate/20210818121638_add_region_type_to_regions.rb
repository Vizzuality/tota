class AddRegionTypeToRegions < ActiveRecord::Migration[6.1]
  def change
    add_column :regions, :region_type, :string, null: false, default: 'tourism_region'
  end
end
