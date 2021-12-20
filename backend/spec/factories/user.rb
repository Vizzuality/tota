FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "admin#{n}#{rand(99_999)}@example.com" }
    name { 'Bobby Example' }
    password { 'SuperSecret6' }
    admin { false }

    factory :admin do
      admin { true }
    end
  end
end
