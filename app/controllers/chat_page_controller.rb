class ChatPageController < ApplicationController
  before_action :set_group

  def show
    @group = Group.find(params[:id])
    @messages = @group.messages.order(created_at: :asc)

    # Pass data to React via props
    @@props = {
      groupName: @group.name,
      groupImageUrl: @group.image_url,
      groupColor: @group.color, # Assuming you have a `color` field in the Group model
      messages: @messages.as_json(only: [:id, :content, :user_name, :created_at])
    }
    
  end

  def create_message
    @message = @group.messages.new(message_params)
    @message.user = current_user  # Assuming you're using Devise for user authentication

    if @message.save
      render json: @message, status: :created  # Respond with the created message
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_group
    @group = Group.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
