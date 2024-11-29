# test/controllers/groups_controller_test.rb
require "test_helper"

class GroupsControllerTest < ActionDispatch::IntegrationTest
  # Test the index action to check if the list of groups can be fetched
  test "should get index" do
    get groups_url  # Send a GET request to the groups index URL
    assert_response :success  # Assert that the response is successful (status code 200)
  end

end
