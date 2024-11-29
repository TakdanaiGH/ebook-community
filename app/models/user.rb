class User < ApplicationRecord
  # Include default devise modules.
  # Other available modules are: :confirmable, :lockable, :timeoutable, :trackable, :omniauthable
  has_one_attached :profile_picture
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Validations
  # validates :name, presence: true  # Ensures the username is provided
  has_many :messages
  # has_secure_password
  
  has_many :group_memberships
  has_many :groups, through: :group_memberships
end
