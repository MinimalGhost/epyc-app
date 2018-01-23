class User < ApplicationRecord
  belongs_to :game, required: false
  has_many :entries
  after_save :check_game_users

  def check_game_users
    if self.game.users.length == self.game.num_of_players
      self.game.status = "in progress"
      self.game.save
    end
  end
end
