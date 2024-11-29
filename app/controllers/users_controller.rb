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
  def current
    render json: { id: current_user.id, name: current_user.name }
  end
  
  def joined_groups
    # Fetch groups that the current user has joined
    @joined_groups = current_user.groups

    render json: @joined_groups, status: :ok
  end
end
