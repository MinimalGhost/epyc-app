## EPYC App
A digital multiplayer port of the popular party game "Eat Poop You Cat" that is the drawing equivalent of the game "Telephone." Uses HTML5 canvas to draw and share pictures with other players in a game.

## Installing / Getting Started
The UI was written using vanilla JavaScript and Skeleton boilerplate. This project uses Rails 5.1.4. It also uses the Postgres database.

Fork and/or clone the repository down then cd into epyc-backend-app and run:

rails db:create
rails db:migrate
and

rails s
to start the server on your local host.

Then, open index.html from front-end/src in your browser of choice. The frontend client is set by default to point to a backend running on localhost:3000 which is the Rails server default if nothing else is running.

## Instructions

The app requires a minimum of 2 players to be properly used but is best with 3 or more. You can use ngrok to create a URL to your local host and allow multiple clients to connect and test functionality. Follow the simple ngrok setup to configure.

Api Reference
       Prefix Verb   URI Pattern                   Controller#Action
  api_v1_games GET    /api/v1/games(.:format)       api/v1/games#index
               POST   /api/v1/games(.:format)       api/v1/games#create
   api_v1_game GET    /api/v1/games/:id(.:format)   api/v1/games#show
               PATCH  /api/v1/games/:id(.:format)   api/v1/games#update
               PUT    /api/v1/games/:id(.:format)   api/v1/games#update
               DELETE /api/v1/games/:id(.:format)   api/v1/games#destroy
  api_v1_users GET    /api/v1/users(.:format)       api/v1/users#index
               POST   /api/v1/users(.:format)       api/v1/users#create
   api_v1_user GET    /api/v1/users/:id(.:format)   api/v1/users#show
               PATCH  /api/v1/users/:id(.:format)   api/v1/users#update
               PUT    /api/v1/users/:id(.:format)   api/v1/users#update
               DELETE /api/v1/users/:id(.:format)   api/v1/users#destroy
  api_v1_cards GET    /api/v1/cards(.:format)       api/v1/cards#index
               POST   /api/v1/cards(.:format)       api/v1/cards#create
   api_v1_card GET    /api/v1/cards/:id(.:format)   api/v1/cards#show
               PATCH  /api/v1/cards/:id(.:format)   api/v1/cards#update
               PUT    /api/v1/cards/:id(.:format)   api/v1/cards#update
               DELETE /api/v1/cards/:id(.:format)   api/v1/cards#destroy
api_v1_entries GET    /api/v1/entries(.:format)     api/v1/entries#index
               POST   /api/v1/entries(.:format)     api/v1/entries#create
  api_v1_entry GET    /api/v1/entries/:id(.:format) api/v1/entries#show
               PATCH  /api/v1/entries/:id(.:format) api/v1/entries#update
               PUT    /api/v1/entries/:id(.:format) api/v1/entries#update
               DELETE /api/v1/entries/:id(.:format) api/v1/entries#destroy



## Authors
Eric Kollegger - @MinimalGhost
Yamuna Navada - @yamunanavada
Adam Walter - @Waltxr


## License
MIT Copyright 2018 Eric Kollegger, Yamuna Navada and Adam Walter
