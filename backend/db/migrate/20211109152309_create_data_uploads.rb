class CreateDataUploads < ActiveRecord::Migration[6.1]
  def change
    create_table :data_uploads do |t|
      t.references :uploaded_by, foreign_key: { to_table: :users, on_delete: :nullify }, index: true
      t.string :uploader, null: false
      t.jsonb :details, default: {}

      t.timestamps
    end
  end
end
