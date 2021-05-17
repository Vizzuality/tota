class CreateIndicators < ActiveRecord::Migration[6.1]
  def change
    create_table :indicators do |t|
      t.string :name, null: false
      t.string :code, null: false, index: true
      t.text :description
      t.belongs_to :theme, null: false, foreign_key: true, index: true
      t.string :unit

      t.timestamps
    end
  end
end
