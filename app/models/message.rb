# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  
  validates :content, presence: true
end
