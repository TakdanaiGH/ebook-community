class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # Permit additional parameters for account updates (as you already have)
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :name, :age, :occupation, :housing_situation, :income,
      :goals_text, :questions_text, :computer_equipment, :profile_picture
    ])

    # Permit additional parameters for sign-up (required during user registration)
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name]) # Or [:username] if you are using 'username'
  end
end
