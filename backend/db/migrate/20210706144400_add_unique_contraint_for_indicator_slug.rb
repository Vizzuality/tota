class AddUniqueContraintForIndicatorSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :indicators, :slug, unique: true
  end
end
