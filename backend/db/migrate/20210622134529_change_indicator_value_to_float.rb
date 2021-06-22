class ChangeIndicatorValueToFloat < ActiveRecord::Migration[6.1]
  def up
    change_column :indicator_values, :value, :float, using: 'value::float'
  end

  def down
    change_column :indicator_values, :value, :string
  end
end
