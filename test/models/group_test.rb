# test/models/group_test.rb
require "test_helper"

class GroupTest < ActiveSupport::TestCase
  setup do
    @group = Group.new(name: "Test Group")
  end

  test "should be invalid without a name" do
    @group.name = nil
    assert_not @group.valid?
    assert_includes @group.errors[:name], "can't be blank"
  end

  test "should be invalid with a non-unique name" do
    @group.save
    duplicate_group = Group.new(name: @group.name)
    assert_not duplicate_group.valid?
    assert_includes duplicate_group.errors[:name], "has already been taken"
  end

  # Test associations
  test "should have many users" do
    assert_respond_to @group, :users
  end

  test "should have many messages" do
    assert_respond_to @group, :messages
  end
end
