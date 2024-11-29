class MessagesController < ApplicationController
  before_action :set_group

  def create
    @message = @group.messages.new(message_params)
    @message.user = current_user  # Associate the current user with the message

    if @message.save
      render json: message_response(@message), status: :created
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @messages = @group.messages.order(created_at: :asc)
    render json: @messages.map { |message| message_response(message) }
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:content, :name)  # No need for :name anymore
  end

  def message_response(message)
    user = message.user
    {
      id: message.id,
      content: message.content,
      user_id: user.id,
      name: user.name,
      profile_picture_url: user.profile_picture.attached? ? url_for(user.profile_picture) : generate_color_for_user(user.id)
    }
  end

  def generate_color_for_user(user_id)
    letters = "0123456789ABCDEF"
    hash = 0

    # Generate a hash from the user ID
    user_id.to_s.chars.each do |char|
      hash = char.ord + ((hash << 5) - hash)
    end

    # Convert the hash to a color
    color = "#"
    6.times do |i|
      color += letters[(hash >> (i * 4)) & 0xF]
    end

    color
  end
end
