class Game < ApplicationRecord
  has_many :users
  has_many :cards, through: :users
  # after_save :update_turn
  #
  #
  # def update_turn
  #   # if number of entreis === turns * users
  #   game.turns += 1
  #   game.save
  # end
  #
  #
end
