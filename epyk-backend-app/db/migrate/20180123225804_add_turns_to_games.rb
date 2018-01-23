class AddTurnsToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :turns, :integer
  end
end
