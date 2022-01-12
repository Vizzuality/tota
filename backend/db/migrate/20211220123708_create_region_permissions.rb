class CreateRegionPermissions < ActiveRecord::Migration[6.1]
  def change
    create_table :region_permissions do |t|
      t.belongs_to :user
      t.belongs_to :region

      t.timestamps
    end
  end
end
