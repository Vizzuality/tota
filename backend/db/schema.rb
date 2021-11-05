# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_26_153641) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "business_types", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["parent_id"], name: "index_business_types_on_parent_id"
  end

  create_table "development_funds", force: :cascade do |t|
    t.string "project_title", null: false
    t.text "project_description"
    t.string "recipient"
    t.string "lead_organization"
    t.bigint "region_id", null: false
    t.string "location"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.string "categories", default: [], array: true
    t.string "scope"
    t.string "planning_area"
    t.string "second_planning_area"
    t.float "total_project_cost"
    t.float "key_funding_amount"
    t.string "key_funding_source"
    t.string "funding_subtype"
    t.integer "funding_call_year"
    t.string "funding_call_month"
    t.string "project_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["region_id"], name: "index_development_funds_on_region_id"
  end

  create_table "indicator_values", force: :cascade do |t|
    t.bigint "indicator_id", null: false
    t.string "date"
    t.string "category_1"
    t.string "category_2"
    t.float "value", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "region_id"
    t.index ["indicator_id"], name: "index_indicator_values_on_indicator_id"
    t.index ["region_id"], name: "index_indicator_values_on_region_id"
  end

  create_table "indicators", force: :cascade do |t|
    t.string "slug", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_indicators_on_slug", unique: true
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "region_id", null: false
    t.bigint "business_type_id"
    t.integer "external_company_id"
    t.boolean "indigenous_tourism"
    t.boolean "biosphere_program_member"
    t.text "website_url"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "accessibility"
    t.index ["business_type_id"], name: "index_organizations_on_business_type_id"
    t.index ["region_id"], name: "index_organizations_on_region_id"
  end

  create_table "regions", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "region_type", default: "tourism_region", null: false
    t.string "slug", null: false
    t.boolean "active", default: true
    t.index ["parent_id"], name: "index_regions_on_parent_id"
    t.index ["slug"], name: "index_regions_on_slug", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "business_types", "business_types", column: "parent_id"
  add_foreign_key "development_funds", "regions", on_delete: :cascade
  add_foreign_key "indicator_values", "indicators"
  add_foreign_key "indicator_values", "regions", on_delete: :cascade
  add_foreign_key "organizations", "business_types"
  add_foreign_key "organizations", "regions", on_delete: :cascade
  add_foreign_key "regions", "regions", column: "parent_id", on_delete: :cascade
end
