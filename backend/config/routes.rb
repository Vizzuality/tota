Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :development_funds, only: [:index]
      resources :organizations, only: [:index]
      resources :indicators, only: [:index]
      resources :regions, only: [:index]
    end
  end
end
