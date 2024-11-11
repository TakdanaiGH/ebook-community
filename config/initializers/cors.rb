Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://127.0.0.1:3000'  # Replace with your React app's URL if different
      
      resource '/ebooks/*',  # Allow API calls to `/ebooks/` endpoints
        headers: :any,
        methods: [:get, :post, :options]
    end
  end
  