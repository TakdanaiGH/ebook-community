class EbooksController < ApplicationController
  require 'httparty'
  require 'json'

  BASE_URL = "https://openlibrary.org/search.json"

  # GET /ebooks/search?query=<search_query>
  def search
    query = params[:query] || "public domain"  # Default search query if no query is passed
    year_range = params[:year_range]            # Year range filter (start-end)
    offset = params[:offset].to_i || 0          # Pagination offset (start from 0 by default)
    limit = 24                                  # Number of books to fetch

    url = "#{BASE_URL}?q=#{query}&limit=#{limit}&offset=#{offset}" # Fetch 24 books, use offset for pagination
    url += "&year=#{year_range}" if year_range.present?

    response = fetch_books(url)

    if response[:success]
      books = response[:data]["docs"]  # Get books data

      # Filter books to include only those with a cover
      books_with_cover = books.select { |book| book['cover_i'].present? }

      # Return the books as JSON to React
      render json: { books: books_with_cover }
    else
      render json: { books: [], error: response[:error] }, status: :unprocessable_entity
    end
  end

  private

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
