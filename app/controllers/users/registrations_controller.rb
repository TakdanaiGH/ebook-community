class Users::RegistrationsController < Devise::RegistrationsController
  protected

  def update_resource(resource, params)
    resource.update(params)
  end

  private

  def account_update_params
    params.require(:user).permit(
      :name, :age, :occupation, :housing_situation, :income,
      :goals_text, :questions_text, :computer_equipment, :profile_picture
    )
  end
end
