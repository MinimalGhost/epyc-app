# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180124212557) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "entries", force: :cascade do |t|
    t.string "input"
    t.bigint "user_id"
    t.bigint "card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_entries_on_card_id"
    t.index ["user_id"], name: "index_entries_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "title"
    t.string "status"
    t.integer "num_of_players"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "turns", default: 1
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_users_on_game_id"
  end

  add_foreign_key "cards", "users"
  add_foreign_key "entries", "cards"
  add_foreign_key "entries", "users"
  add_foreign_key "users", "games"
end
