Rails.application.routes.draw do
  devise_for :users, path: 'auth', controllers: { sessions: 'auth/sessions' }

  root to: 'home#index'

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
    resources :widgets, only: [:index, :edit, :update] do
      member do
        post :update_position
      end
    end
  end

  namespace :api, format: 'json' do
    namespace :v1 do
      resources :development_funds, only: [:index], format: /(json|geojson)/
      resources :organizations, only: [:index], format: /(json|geojson)/
      resources :indicators, only: [:index]
      resources :regions, only: [:index]
      resources :themes, only: [:index]
      resources :widgets, only: [:index]
      resource :user, only: [:show]
    end
  end
end
