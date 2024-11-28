class AddNameToGroupMemberships < ActiveRecord::Migration[7.2]
  def change
    add_column :group_memberships, :name, :string
  end
end
