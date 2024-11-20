class AddProfileToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :age, :integer
    add_column :users, :occupation, :string
    add_column :users, :housing_situation, :string
    add_column :users, :income, :string
    add_column :users, :goals_text, :text
    add_column :users, :questions_text, :text
    add_column :users, :computer_equipment, :text
    add_column :users, :profile_picture, :string
  end
end
