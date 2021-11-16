class AddCascadeDeletesForIndicators < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :indicator_values, :indicators
    add_foreign_key :indicator_values, :indicators, on_delete: :cascade
  end
end
