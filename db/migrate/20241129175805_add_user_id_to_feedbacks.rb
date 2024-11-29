class AddUserIdToFeedbacks < ActiveRecord::Migration[7.2]
  def change
    add_reference :feedbacks, :user, null: true, foreign_key: true
  end
end
