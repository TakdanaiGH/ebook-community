# app/models/group_membership.rb
class GroupMembership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  # Ensuring a user can only join a group once
  validates :user_id, uniqueness: { scope: :group_id }
  # validates :name, presence: true
end
