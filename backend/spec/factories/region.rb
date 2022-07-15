FactoryBot.define do
  factory :region do
    sequence(:name) { |n| "Region #{n}" }
    region_type { 'tourism_region' }
    active { true }

    trait :province do
      region_type { 'province' }
    end

    trait :tourism_subregion do
      region_type { 'tourism_subregion' }
    end
  end
end
