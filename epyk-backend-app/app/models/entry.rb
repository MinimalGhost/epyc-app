class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :card
  after_save :update_turn

  def update_turn
    game = self.user.game
    entries = game.cards.map{|card| card.entries}.flatten
    # for some reason, the game ends at the correct itme for the person who started teh game
    if game.users.length*game.turns == entries.length
      game.turns += 1
      game.save
    end
  end



end
