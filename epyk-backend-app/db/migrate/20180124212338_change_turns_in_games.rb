class ChangeTurnsInGames < ActiveRecord::Migration[5.1]
  def change
    remove_column :games, :turns
  end
end
