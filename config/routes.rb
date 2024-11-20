Rails.application.routes.draw do
  # Devise routes for user authentication
  devise_for :users, controllers: {
  sessions: 'users/sessions',
  registrations: 'users/registrations'
}

  # Map login and register to Devise controllers explicitly
  devise_scope :user do
    get '/login', to: 'devise/sessions#new', as: :login
    get '/register', to: 'devise/registrations#new', as: :register
  end

  # Community and Ebooks specific routes
  get 'communities/index'
  get 'ebooks/index'
  get 'ebooks/search', to: 'ebooks#search'
  get 'profile', to: 'users#show', as: 'user_profile'
  

  resources :ebooks, only: [:index]
  resources :communities, only: [:index]

  # Home page
  get 'home/index'

  # Application root path
  root 'home#index'

  # Health check route
  get 'up' => 'rails/health#show', as: :rails_health_check

  # PWA service worker and manifest
  get 'service-worker' => 'rails/pwa#service_worker', as: :pwa_service_worker
  get 'manifest' => 'rails/pwa#manifest', as: :pwa_manifest
end
