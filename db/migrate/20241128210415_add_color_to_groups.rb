class AddColorToGroups < ActiveRecord::Migration[7.2]
  def change
    add_column :groups, :color, :string
  end
end
