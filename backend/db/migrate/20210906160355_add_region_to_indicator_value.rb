class AddRegionToIndicatorValue < ActiveRecord::Migration[6.1]
  def change
    add_reference :indicator_values, :region, foreign_key: { on_delete: :cascade }
    remove_column :indicator_values, :region, :string
  end
end
