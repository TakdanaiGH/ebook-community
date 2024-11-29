require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = User.new(
      name: "Test User",
      email: "test3@example.com",
      password: "password",
      password_confirmation: "password"
    )
  end

  # Test validations
  test "should be valid with valid attributes" do
    assert @user.valid?, @user.errors.full_messages.join(", ")
  end

  test "should be invalid without a name" do
    @user.name = nil
    assert_not @user.valid?
    assert_includes @user.errors[:name], "can't be blank"
  end

  test "should be invalid without an email" do
    @user.email = nil
    assert_not @user.valid?
    assert_includes @user.errors[:email], "can't be blank"
  end

  # Test associations
  test "should respond to messages association" do
    assert_respond_to @user, :messages
  end

  test "should respond to group_memberships association" do
    assert_respond_to @user, :group_memberships
  end

  test "should respond to groups association" do
    assert_respond_to @user, :groups
  end

  # Test profile picture attachment
  test "should attach a profile picture" do
    file_path = Rails.root.join("test/fixtures/files/maxresdefault.jpg")
    assert File.exist?(file_path), "Fixture file maxresdefault.jpg is missing"

    @user.profile_picture.attach(
      io: File.open(file_path),
      filename: "maxresdefault.jpg",
      content_type: "image/jpg"
    )
    assert @user.profile_picture.attached?
  end

  # Test Devise modules
  test "should authenticate with valid credentials" do
    @user.save
    assert User.find_by(email: "test3@example.com").valid_password?("password")
  end

  test "should not authenticate with invalid credentials" do
    @user.save
    assert_not User.find_by(email: "test3@example.com").valid_password?("wrongpassword")
  end
end
