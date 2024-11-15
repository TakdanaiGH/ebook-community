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
    url = "#{BASE_URL}?q=#{query}&limit=24"  # Set limit to 18 books

    # Fetch books from Open Library API
    response = HTTParty.get(url)
    
    if response.success?
      books = JSON.parse(response.body)["docs"]  # Get books data
      render json: { books: books }  # Return books as JSON to React
    else
      # If the request fails, send an empty array and an error message
      render json: { books: [], error: "Could not load books from Open Library." }, status: :unprocessable_entity
    end
  end
end
