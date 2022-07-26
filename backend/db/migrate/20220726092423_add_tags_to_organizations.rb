class AddTagsToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :tags, :text # easier to just save a text and not string[]
  end
end
