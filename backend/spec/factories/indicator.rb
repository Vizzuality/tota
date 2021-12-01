FactoryBot.define do
  factory :indicator do
    slug { 'visitors_by_origin_monthly' }
    dynamic { false }

    trait :dynamic do
      dynamic { true }
    end
  end
end
