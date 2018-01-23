class Api::V1::EntriesController < ApplicationController

  def index
    @entries = Entry.all
    render json: @entries
  end

  def create
    @entry = Entry.new(entry_params)
    if @entry.save
      render json: @entry
    else
      render json: {errors: @entry.errors.full_messages}, status: 422
    end
  end

  def update
    @entry = Entry.find(params[:id])

    @entry.update(entry_params)
    if @entry.save
      render json: @entry
    else
      render json: {errors: @entry.errors.full_messages}, status: 422
    end
  end

  private
  def entry_params
    params.permit(:input, :user_id, :card_id)
  end

end
