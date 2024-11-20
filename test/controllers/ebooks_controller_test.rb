require 'test_helper'
require 'webmock/minitest'

class EbooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @base_url = "https://openlibrary.org/search.json"
  end

  test "should return books with covers" do
    stub_request(:get, "#{@base_url}?q=public+domain&limit=50&page=1")
      .to_return(status: 200, body: { docs: [{ "title" => "Book One", "cover_i" => 123 }] }.to_json)

    get search_ebooks_path(query: "public domain")

    assert_response :success
    response_data = JSON.parse(response.body)
    assert_equal 1, response_data["books"].size
    assert_equal "Book One", response_data["books"].first["title"]
  end

  test "should handle API failure gracefully" do
    stub_request(:get, "#{@base_url}?q=public+domain&limit=50&page=1")
      .to_return(status: 500, body: "")

    get search_ebooks_path(query: "public domain")

    assert_response :unprocessable_entity
    response_data = JSON.parse(response.body)
    assert_equal "Could not load books from Open Library.", response_data["error"]
  end
end
