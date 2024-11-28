class CreateJoinedGroups < ActiveRecord::Migration[7.2]
  def change
    create_table :joined_groups do |t|
      t.references :user, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
