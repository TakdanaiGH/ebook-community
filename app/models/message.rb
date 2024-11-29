class Message < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :group
  
  # Validations
  validates :content, presence: true, length: { maximum: 500 } # Ensure max length for content
end
