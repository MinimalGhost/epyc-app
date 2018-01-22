class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :status
      t.integer :num_of_players

      t.timestamps
    end
  end
end
