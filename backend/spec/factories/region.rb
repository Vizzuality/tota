FactoryBot.define do
  factory :region do
    sequence(:name) { |n| "Region #{n}" }
    region_type { 'tourism_region' }
  end
end
