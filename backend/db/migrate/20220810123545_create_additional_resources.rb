class CreateAdditionalResources < ActiveRecord::Migration[7.0]
  def change
    create_table :additional_resource_groups do |t|
      t.string :name

      t.timestamps
    end

    create_table :additional_resources do |t|
      t.belongs_to :group, foreign_key: {to_table: :additional_resource_groups, on_delete: :nullify}, index: true
      t.belongs_to :region, foreign_key: {on_delete: :cascade}, index: true, null: false

      t.boolean :public, default: false, null: false
      t.string :title, null: false
      t.text :link

      t.timestamps
    end
  end
end
