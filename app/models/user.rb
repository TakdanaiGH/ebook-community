class User < ApplicationRecord
  # Include default devise modules.
  # Other available modules are: :confirmable, :lockable, :timeoutable, :trackable, :omniauthable
  has_one_attached :profile_picture
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Validations
  validates :name, presence: true  # Ensures the username is provided
end
