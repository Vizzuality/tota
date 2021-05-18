Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :organizations, only: [:index]
      resources :indicators, only: [:index]
    end
  end
end
