class AddAccountTypeToUsers < ActiveRecord::Migration[6.1]
  User = Class.new(ActiveRecord::Base)

  def change
    add_column :users, :account_type, :string, default: 'user', null: false

    # all of the accounts up to this point should be admin, but default value for new should be user
    reversible do |dir|
      dir.up { User.update_all(account_type: 'admin')  }
    end
  end
end
