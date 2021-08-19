class AddSlugToRegions < ActiveRecord::Migration[6.1]
  Region = Class.new(ActiveRecord::Base)

  def up
    add_column :regions, :slug, :string

    Region.find_each do |region|
      region.update!(slug: region.name.parameterize)
    end

    change_column_null :regions, :slug, false
    add_index :regions, :slug, unique: true
  end

  def down
    remove_column :regions, :slug
  end
end
