Rails.application.routes.draw do
  devise_for :users, path: 'admin'

  namespace :admin do
    root to: 'admin/users#index'

    resources :users
    resources :regions
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
