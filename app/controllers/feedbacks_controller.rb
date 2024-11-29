class FeedbacksController < ApplicationController
    before_action :authenticate_user! # Ensure the user is logged in
  
    def create
      feedback = current_user.feedbacks.build(feedback_params) # Associate with the current user
  
      if feedback.save
        render json: { message: 'Feedback submitted successfully!' }, status: :created
      else
        render json: { errors: feedback.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def feedback_params
      params.require(:feedback).permit(:question1, :question2, :question3, :question4, :question5, :comment)
    end
  end
  