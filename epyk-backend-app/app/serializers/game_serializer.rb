class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :num_of_players, :status, :turns
  has_many :users
  has_many :cards
end
