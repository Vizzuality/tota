class CreateRegions < ActiveRecord::Migration[6.1]
  def change
    create_table :regions do |t|
      t.string :name
      t.belongs_to :parent, foreign_key: {to_table: :regions}, index: true

      t.timestamps
    end
  end
end
