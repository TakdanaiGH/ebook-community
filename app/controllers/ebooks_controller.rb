class EbooksController < ApplicationController
  require 'httparty'
  require 'json'

  BASE_URL = "https://openlibrary.org/search.json"

  # GET /ebooks or /ebooks/search?query=<search_query>
  def index
    # The React component will handle the display, so no need to fetch books here.
  end

  # Search action to handle requests from React
  def search
    query = params[:query] || "public domain"  # Default search query if no query is passed
    limit = 24  # Number of books to fetch with covers
    books_with_cover = []  # Array to accumulate books with covers
    page = 1  # Start from the first page
    
    # Loop to keep fetching more pages until we have 24 books with covers
    while books_with_cover.length < limit
      url = "#{BASE_URL}?q=#{query}&limit=50&page=#{page}"  # Request 50 books per page to increase the chance of getting books with covers

      # Fetch books from Open Library API
      response = fetch_books(url)

      if response[:success]
        books = response[:data]["docs"]  # Get books data

        # Filter books to include only those with a cover
        books_with_cover += books.select { |book| book['cover_i'].present? }

        # If we have enough books, stop fetching
        break if books_with_cover.length >= limit
      else
        # If the request fails, return an error message
        render json: { books: [], error: response[:error] }, status: :unprocessable_entity
        return
      end

      page += 1  # Move to the next page
    end

    # Ensure we return exactly 24 books
    books_with_cover = books_with_cover.first(limit)

    # Return the books as JSON to React
    render json: { books: books_with_cover }
  end

  private

  # Encapsulate the HTTP request logic in a separate method for easier mocking
  def fetch_books(url)
    response = HTTParty.get(url)
    if response.success?
      { success: true, data: JSON.parse(response.body) }
    else
      { success: false, error: "Could not load books from Open Library." }
    end
  rescue StandardError => e
    { success: false, error: e.message }
  end
end
