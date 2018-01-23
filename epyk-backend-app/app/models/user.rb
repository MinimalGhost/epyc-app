class User < ApplicationRecord
  belongs_to :game, required: false
end
