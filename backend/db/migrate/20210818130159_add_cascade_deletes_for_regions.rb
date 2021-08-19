class AddCascadeDeletesForRegions < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :regions, :regions, column: :parent_id
    add_foreign_key :regions, :regions, column: :parent_id, on_delete: :cascade
    remove_foreign_key :organizations, :regions
    add_foreign_key :organizations, :regions, on_delete: :cascade
  end
end
