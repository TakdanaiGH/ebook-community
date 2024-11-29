class RemoveNameFromGroupMemberships < ActiveRecord::Migration[7.2]
  def change
    remove_column :group_memberships, :name, :string
  end
end
