class CardSerializer < ActiveModel::Serializer
  attributes :id, :user_id
  has_many :entries
end
