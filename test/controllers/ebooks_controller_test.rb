require "test_helper"

class EbooksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get ebooks_index_url
    assert_response :success
  end
end
