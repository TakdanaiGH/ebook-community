class Group < ApplicationRecord
    has_one_attached :image
    validates :name, presence: true, uniqueness: { case_sensitive: false }
    has_many :messages
    has_many :joined_groups
    has_many :users, through: :joined_groups
    
    def image_url
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) if image.attached?
    end
    
    has_many :group_memberships
    has_many :users, through: :group_memberships
  end
  