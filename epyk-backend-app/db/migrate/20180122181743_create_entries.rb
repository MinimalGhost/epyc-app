class CreateEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :entries do |t|
      t.string :input
      t.belongs_to :user, foreign_key: true
      t.belongs_to :card, foreign_key: true

      t.timestamps
    end
  end
end
