class AddNameToMessages < ActiveRecord::Migration[7.2]
  def change
    add_column :messages, :name, :string
  end
end
