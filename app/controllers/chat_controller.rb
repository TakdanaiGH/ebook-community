# # app/controllers/chat_page_controller.rb
# class ChatPageController < ApplicationController
#   before_action :set_group

#   def show
#     @messages = @group.messages.includes(:user).order(created_at: :asc)
#   end

#   def create_message
#     @message = @group.messages.new(message_params)
#     @message.user = current_user  # Assuming you're using Devise for user authentication

#     if @message.save
#       render json: @message, status: :created  # Respond with the created message
#     else
#       render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
#     end
#   end

#   private

#   def set_group
#     @group = Group.find(params[:id])
#   end

#   def message_params
#     params.require(:message).permit(:content)
#   end
# end
