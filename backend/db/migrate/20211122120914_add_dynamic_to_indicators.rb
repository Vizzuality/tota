class AddDynamicToIndicators < ActiveRecord::Migration[6.1]
  def change
    add_column :indicators, :dynamic, :boolean, default: false, null: false
  end
end
