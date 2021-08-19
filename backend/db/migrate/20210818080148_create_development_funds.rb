class CreateDevelopmentFunds < ActiveRecord::Migration[6.1]
  def change
    create_table :development_funds do |t|
      t.string :project_title, null: false
      t.text :project_description
      t.string :recipient
      t.string :lead_organization
      t.references :region, null: false, foreign_key: { on_delete: :cascade }
      t.string :location
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.string :categories, array: true, default: []
      t.string :scope
      t.string :planning_area
      t.string :second_planning_area
      t.float :total_project_cost
      t.float :key_funding_amount
      t.string :key_funding_source
      t.string :funding_subtype
      t.integer :funding_call_year
      t.string :funding_call_month
      t.string :project_status

      t.timestamps
    end
  end
end
