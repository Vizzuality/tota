class CreateThemes < ActiveRecord::Migration[6.1]
  def change
    create_table :themes do |t|
      t.string :slug, null: false, unique: true
      t.string :title, null: false

      t.timestamps
    end
  end
end
