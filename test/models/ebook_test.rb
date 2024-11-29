require "test_helper"

class EbookTest < ActiveSupport::TestCase
  # Test fetching from OpenLibrary API (You can mock the API call in tests)
  test "should fetch ebook data from OpenLibrary" do
    # Use a real or mocked ISBN number
    ebook = Ebook.fetch_from_openlibrary("9780140328721")
    
    assert_not_nil ebook.title
    assert_not_nil ebook.author
  end
end
