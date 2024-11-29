class User < ApplicationRecord
  # Include default devise modules.
  # Other available modules are: :confirmable, :lockable, :timeoutable, :trackable, :omniauthable
  has_one_attached :profile_picture
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  #feed back
  has_many :feedbacks
  # Associations
  has_many :messages
  has_many :group_memberships
  has_many :groups, through: :group_memberships

  def profile_picture_url
    if profile_picture.attached?
      Rails.application.routes.url_helpers.rails_blob_path(profile_picture, only_path: true)
    else
      nil
    end
  end
end
