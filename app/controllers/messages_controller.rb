class MessagesController < ApplicationController
  before_action :set_group

  def create
    @message = @group.messages.new(message_params)
    @message.user = current_user  # Associate the current user with the message

    if @message.save
      render json: @message, status: :created
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @messages = @group.messages.order(created_at: :asc)
    render json: @messages
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:content, :name)  # No need for :name anymore
  end
end
