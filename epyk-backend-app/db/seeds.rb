# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.create(title: "New Game Yo", status: "pending", num_of_players: 3)
Game.create(title: "Another Game Yo", status: "pending", num_of_players: 3)

User.create(name: "Yamuna", game_id: 1)
User.create(name: "Adam", game_id: 1)
User.create(name: "Eric", game_id: 1)

Card.create(user_id: 1)

Entry.create(input: "some stuff", user_id: 1, card_id: 1)
Entry.create(input: "more stuff", user_id: 2, card_id: 1)
Entry.create(input: "great stuff", user_id: 3, card_id: 1)
