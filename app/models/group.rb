class Group < ApplicationRecord
  # Image attachment
  has_one_attached :image

  # Validations
  validates :name, presence: true, uniqueness: { case_sensitive: false }

  # Associations
  has_many :messages
  has_many :group_memberships
  has_many :users, through: :group_memberships

  # Image URL generation (helper function for views or controllers)
  def image_url
    Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) if image.attached?
  end

  def member_count
    users.count
  end
end
