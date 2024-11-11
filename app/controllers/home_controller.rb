class HomeController < ApplicationController
  def index
    @home_page = Home.first # Get the first home page record (if it exists)
  end
end
