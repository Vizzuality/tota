class CreateBusinessTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :business_types do |t|
      t.string :name, null: false
      t.belongs_to :parent, foreign_key: {to_table: :business_types}, index: true

      t.timestamps
    end
  end
end
