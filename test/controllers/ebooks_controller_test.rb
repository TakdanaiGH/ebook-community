# test/controllers/ebooks_controller_test.rb
require 'test_helper'
require 'webmock/minitest'

class EbooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @base_url = "https://openlibrary.org/search.json"
  end

  test "should return books with covers" do
    # Stubbing the external API request
    stub_request(:get, "#{@base_url}?q=public+domain&limit=50&page=1")
      .to_return(status: 200, body: { docs: [{ "title" => "Book One", "cover_i" => 123 }] }.to_json)

    # Make the request to the search_ebooks_path
    get search_ebooks_path(query: "public domain")

    # Asserting the response is successful
    assert_response :success
    # Parsing the JSON response
    response_data = JSON.parse(response.body)
    # Asserting the response contains the expected data
    assert_equal 1, response_data["books"].size
    assert_equal "Book One", response_data["books"].first["title"]
  end

  test "should handle API failure gracefully" do
    # Stubbing the external API request to simulate failure
    stub_request(:get, "#{@base_url}?q=public+domain&limit=50&page=1")
      .to_return(status: 500, body: "")

    # Making the request again to test failure handling
    get search_ebooks_path(query: "public domain")

    # Asserting the response handles failure gracefully
    assert_response :unprocessable_entity
    # Parsing the error response
    response_data = JSON.parse(response.body)
    # Asserting the error message is as expected
    assert_equal "Could not load books from Open Library.", response_data["error"]
  end
end
