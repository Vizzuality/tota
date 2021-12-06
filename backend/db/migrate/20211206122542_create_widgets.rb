class CreateWidgets < ActiveRecord::Migration[6.1]
  def change
    create_table :widgets do |t|
      t.belongs_to :theme, null: false, foreign_key: {on_delete: :cascade}, index: true

      t.string :slug, null: false, unique: true
      t.string :title, null: false
      t.string :sub_title
      t.text :description
      t.text :note
      t.jsonb :sources

      t.timestamps
    end
  end
end
