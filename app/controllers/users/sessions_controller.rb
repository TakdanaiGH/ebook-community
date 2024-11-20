# app/controllers/users/sessions_controller.rb
class Users::SessionsController < Devise::SessionsController
  def create
    super # Leverage Devise's built-in functionality
  end
end
