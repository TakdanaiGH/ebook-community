class Ebook < ApplicationRecord
    belongs_to :user
  
    validates :title, presence: true
    validates :author, presence: true
    validates :isbn, presence: true, uniqueness: true
  
    def self.fetch_from_openlibrary(isbn)
      url = "https://openlibrary.org/api/volumes/brief/isbn/#{isbn}.json"
      response = Net::HTTP.get(URI(url))
      data = JSON.parse(response)
  
      title = data.dig("records", "key", "title")
      author = data.dig("records", "key", "author")
  
      # You can create or update the Ebook with the fetched data
      create(title: title, author: author, isbn: isbn)
    end
  end
