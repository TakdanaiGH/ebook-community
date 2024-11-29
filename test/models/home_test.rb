require 'test_helper'
require 'capybara/rails'

class HomeTest < Minitest::Test
  include Capybara::DSL

  # Test homepage content
  def test_home_content
    visit '/'

    # For debugging, save the page to inspect the HTML output
    # save_and_open_page # Uncomment this line to inspect the page HTML if needed

    # Test if important links are present
    assert page.has_link?("Login", href: "/users/sign_in")
    assert page.has_link?("Ebooks", href: "/ebooks")
    assert page.has_link?("Community", href: "/communities")

    # Ensure the homepage status code is success (HTTP 200)
    assert_equal 200, page.status_code
  end

end
