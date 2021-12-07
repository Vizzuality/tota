Rails.application.routes.draw do
  devise_for :users, path: 'admin'

  root to: redirect('admin/dashboards')

  namespace :admin do
    root to: 'dashboards#index'

    resources :dashboards, only: [:index]
    resources :data_uploads, only: [:index, :new, :create, :show]
    resources :users
    resources :regions, only: [:index, :edit, :update]
    resources :indicator_values, only: [:index]
    resources :organizations, only: [:show, :index]
    resources :development_funds, only: [:show, :index]
    resources :themes, except: [:destroy]
    resources :widgets, only: [:index, :edit, :update]
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
