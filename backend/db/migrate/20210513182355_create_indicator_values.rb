class CreateIndicatorValues < ActiveRecord::Migration[6.1]
  def change
    create_table :indicator_values do |t|
      t.belongs_to :indicator, null: false, foreign_key: true, index: true
      t.string :date
      t.string :region
      t.string :category_1
      t.string :category_2
      t.string :value, null: false

      t.timestamps
    end
  end
end
