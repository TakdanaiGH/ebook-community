class CreateGroups < ActiveRecord::Migration[7.2]
  def change
    create_table :groups do |t|
      t.string :name
      t.string :image
      t.integer :members_count

      t.timestamps
    end
  end
end
