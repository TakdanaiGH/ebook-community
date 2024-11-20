class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  validates :name, presence: true
  validates :profile_picture, presence: false # if it's not required
end
