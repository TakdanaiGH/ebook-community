require "test_helper"

class GroupMembershipTest < ActiveSupport::TestCase
  # Load the fixtures for user and group
  fixtures :users, :groups

  def setup
    # Use fixtures to get the first user and group
    @user = users(:one)  # Refers to the 'one' fixture in users.yml
    @group = groups(:one)  # Refers to the 'one' fixture in groups.yml
  end

  # Test: GroupMembership should be valid with a user and group
  test "should be valid with a user and group" do
    group_membership = GroupMembership.new(user: @user, group: @group)
    assert group_membership.valid?
  end

  # Test: GroupMembership should be invalid without a user
  test "should be invalid without a user" do
    group_membership = GroupMembership.new(group: @group)
    assert_not group_membership.valid?
    assert_includes group_membership.errors[:user], "must exist"
  end

  # Test: GroupMembership should be invalid without a group
  test "should be invalid without a group" do
    group_membership = GroupMembership.new(user: @user)
    assert_not group_membership.valid?
    assert_includes group_membership.errors[:group], "must exist"
  end

  # Test: A user cannot join the same group twice
  test "should not allow a user to join the same group twice" do
    # Create the first membership
    group_membership = GroupMembership.create(user: @user, group: @group)
    assert group_membership.valid?

    # Try to create the same membership again
    duplicate_membership = GroupMembership.new(user: @user, group: @group)
    assert_not duplicate_membership.valid?
    assert_includes duplicate_membership.errors[:user_id], "has already been taken"
  end
end
