class AddPublicToWidgets < ActiveRecord::Migration[7.0]
  Widget = Class.new(ActiveRecord::Base)

  def change
    add_column :widgets, :public, :boolean, default: false, null: false

    # all of the widgets currently on production should be public now
    reversible do |dir|
      dir.up { Widget.update_all(public: true)  }
    end
  end
end
