class Api::V1::CardsController < ApplicationController

  def index
    @cards = Card.all
    render json: @cards
  end

  def create
    @card = Card.new(card_params)
    if @card.save
      render json: @card
    else
      render json: {errors: @card.errors.full_messages}, status: 422
    end
  end

  def update
    @card = Card.find(params[:id])

    @card.update(card_params)
    if @card.save
      render json: @card
    else
      render json: {errors: @card.errors.full_messages}, status: 422
    end
  end

  private
  def card_params
    params.permit(:title, :status, :num_of_players)
  end
end
