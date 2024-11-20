class UsersController < ApplicationController
  before_action :authenticate_user!

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to profile_path, notice: "Profile updated successfully."
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :name, :age, :occupation, :housing_situation, :income,
      :goals_text, :questions_text, :computer_equipment, :profile_picture
    )
  end
end
