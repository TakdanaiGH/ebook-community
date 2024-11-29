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

  # Community and Ebook routes
  get 'communities/index'
  get 'ebooks/index'
  get 'ebooks/search', to: 'ebooks#search'
  get 'profile', to: 'users#show', as: 'user_profile'
  get '/current_user', to: 'users#current'
  
  # Group chat route
  get 'groups/:id/chat', to: 'chat_page#show', as: 'group_chat'
  get 'joined_groups', to: 'groups#joined_groups'
  post '/join_group', to: 'groups#join_group'

  # Resources for groups, with nested messages
  resources :groups, only: [:index, :create, :show] do
    member do
      post 'join'  # Join group
      post 'leave' # Leave group (combined under one member block)
    end

    collection do
      get 'user_groups', to: 'groups#user_groups'
    end
    resources :messages, only: [:create, :index]
  end

  # Resources for ebooks and communities
  resources :ebooks, only: [:index]
  resources :communities, only: [:index]

  # Static home page
  get 'home/index'
  root 'home#index'

  # Health check route
  get 'up', to: 'rails/health#show', as: :health_check

  # PWA service worker and manifest routes
  get 'service-worker', to: 'rails/pwa#service_worker', as: :pwa_service_worker
  get 'manifest', to: 'rails/pwa#manifest', as: :pwa_manifest

 
end
