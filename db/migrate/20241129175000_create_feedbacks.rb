class CreateFeedbacks < ActiveRecord::Migration[7.2]
  def change
    create_table :feedbacks do |t|
      t.integer :question1
      t.integer :question2
      t.integer :question3
      t.integer :question4
      t.integer :question5
      t.text :comment

      t.timestamps
    end
  end
end
