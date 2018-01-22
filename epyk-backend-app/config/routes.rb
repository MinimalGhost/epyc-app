Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show, :update]
      resources :users, only: [:index, :update]
      resources :cards, only: [:index, :show, :update]
      resources :entries, only: [:index, :show, :update]
    end
  end



end
