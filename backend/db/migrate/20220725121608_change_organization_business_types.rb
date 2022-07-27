class ChangeOrganizationBusinessTypes < ActiveRecord::Migration[7.0]
  def change
    # create_table :organization_business_types do |t|
    #   t.belongs_to :organization, foreign_key: { on_delete: :cascade }
    #   t.belongs_to :business_type, foreign_key: { on_delete: :cascade }

    #   t.timestamps
    # end
    rename_column :organizations, :business_type_id, :business_type_1_id
    add_reference :organizations, :business_type_2, foreign_key: { to_table: :business_types }
    remove_reference :business_types, :parent, foreign_key: {to_table: :business_types}
  end
end
