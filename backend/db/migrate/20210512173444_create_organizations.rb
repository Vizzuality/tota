class CreateOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.references :region, null: false, foreign_key: true
      t.references :business_type, foreign_key: true
      t.integer :external_company_id
      t.boolean :indigenous_tourism
      t.boolean :biosphere_program_member
      t.text :website_url
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6

      t.timestamps
    end
  end
end
