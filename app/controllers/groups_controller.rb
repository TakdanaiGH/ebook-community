class GroupsController < ApplicationController
  before_action :authenticate_user! # Ensure the user is logged in

  def show
    @group = Group.find(params[:id])

    render json: {
      id: @group.id,
      name: @group.name,  # Ensure group name is being included
      image_url: @group.image.attached? ? url_for(@group.image) : nil # Return image URL if attached, otherwise nil
    }
  end

  def index
    groups = Group.all

    # Fetch groups that the user has not joined yet
    joined_group_ids = current_user.groups.pluck(:id)
    available_groups = groups.reject { |group| joined_group_ids.include?(group.id) }

    # Render the available groups (those not joined by the current user)
    render json: available_groups.as_json(
      only: [:id, :name, :created_at, :updated_at],
      methods: [:image_url] # Ensure image URL is included for each group
    )
  end

  def create
    # Check if the group name already exists
    if Group.exists?(name: params[:group][:name])
      render json: { error: 'Group name is already taken' }, status: :unprocessable_entity
      return
    end

    # Create the new group
    @group = Group.new(group_params)

    # Check if the image is uploaded and attach it to the group
    if params[:group][:image]
      @group.image.attach(params[:group][:image])  # Attach the image using ActiveStorage
    end

    # Save the group
    if @group.save
      # Fetch messages for the newly created group (if any)
      @messages = Message.where(group_id: @group.id).order(created_at: :asc)

      render json: { 
        id: @group.id, 
        name: @group.name, 
        image_url: @group.image.attached? ? url_for(@group.image) : nil,  # Return image URL if attached
        messages: @messages 
      }, status: :created
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def joined_groups
    # Get the current user (from Devise or your authentication system)
    user = current_user

    # Fetch the groups the current user has joined through group memberships
    groups = user.groups

    # Render the groups in JSON format, including necessary attributes
    render json: groups.as_json(
      only: [:id, :name, :created_at, :updated_at],
      methods: [:image_url] # Include image URL for each group
    )
  end

  def join_group
    group = Group.find_by(id: params[:group_id])

    unless group
      render json: { error: "Group not found" }, status: :not_found
      return
    end

    # Check if the user is already a member
    if group.users.include?(current_user)
      render json: { message: "You are already a member of this group." }, status: :unprocessable_entity
      return
    end

    # Attempt to create the GroupMembership
    membership = GroupMembership.new(user: current_user, group: group)

    if membership.save
      # Return the full group data after the user joins
      render json: {
        id: group.id,
        name: group.name,
        image_url: group.image.attached? ? url_for(group.image) : nil # Return image URL if attached
      }, status: :ok
    else
      # Log error details
      logger.error "Failed to join group: #{membership.errors.full_messages.join(', ')}"
      render json: { error: membership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def leave
    @group = Group.find(params[:id])
    # Logic to remove the user from the group
    current_user.groups.delete(@group)
    redirect_to groups_path, notice: 'You have left the group.'
  end

  private

  def group_params
    # Allow the group name and image
    params.require(:group).permit(:name, :image)
  end
end
