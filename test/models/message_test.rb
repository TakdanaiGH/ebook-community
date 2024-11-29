require "test_helper"
require 'bcrypt'

class MessageTest < ActiveSupport::TestCase
  # Explicitly load users and groups fixtures
  fixtures :users, :groups

  setup do
    # Manually set the password_digest using BCrypt
    @user = users(:one)
    @user.password_digest = BCrypt::Password.create('password')
    @group = groups(:one)  # Reference the first group fixture
    @message = Message.new(
      content: "This is a test message",
      user: @user,
      group: @group
    )
  end

  test "should be invalid without content" do
    @message.content = nil
    assert_not @message.valid?
    assert_includes @message.errors[:content], "can't be blank"
  end

  test "should be invalid if content is too long" do
    @message.content = "a" * 501
    assert_not @message.valid?
    assert_includes @message.errors[:content], "is too long (maximum is 500 characters)"
  end

end
