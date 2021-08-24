Rails.application.routes.draw do
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :development_funds, only: [:index], format: /(json|geojson)/
      resources :organizations, only: [:index], format: /(json|geojson)/
      resources :indicators, only: [:index]
      resources :regions, only: [:index]
    end
  end
end
