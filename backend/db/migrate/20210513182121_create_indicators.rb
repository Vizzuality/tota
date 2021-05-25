class CreateIndicators < ActiveRecord::Migration[6.1]
  def change
    create_table :indicators do |t|
      t.string :slug, null: false, unique: true

      t.timestamps
    end
  end
end
