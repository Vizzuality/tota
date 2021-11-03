Rails.application.routes.draw do
  devise_for :users, path: 'admin'

  root to: 'admin/users#index'

  namespace :admin do
    root to: 'users#index'

    resources :users
    resources :regions
    resources :indicator_values, only: [:index]
    resources :organizations, only: [:index]
    resources :development_funds, only: [:index]
  end

  namespace :api, format: 'json' do
    namespace :v1 do
      resources :development_funds, only: [:index], format: /(json|geojson)/
      resources :organizations, only: [:index], format: /(json|geojson)/
      resources :indicators, only: [:index]
      resources :regions, only: [:index]
    end
  end
end
