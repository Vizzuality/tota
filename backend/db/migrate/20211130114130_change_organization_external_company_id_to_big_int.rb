class ChangeOrganizationExternalCompanyIdToBigInt < ActiveRecord::Migration[6.1]
  def up
    change_column :organizations, :external_company_id, :bigint
  end

  def down
    change_column :organizations, :external_company_id, :integer
  end
end
