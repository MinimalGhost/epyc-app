class AddDefaultValueToTurns < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :turns, :integer, :default => 1
  end
end
