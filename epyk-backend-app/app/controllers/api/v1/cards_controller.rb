class Api::V1::CardsController < ApplicationController

  def index
    @cards = Card.all
    render json: @cards
  end

  def show
    @card = Card.find(params[:id])
    render json: @card
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
    params.permit(:user_id)
  end
end
