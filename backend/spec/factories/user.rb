FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "admin#{n}#{rand(99_999)}@example.com" }
    name { 'Bobby Example' }
    password { 'SuperSecret6' }
    account_type { 'user' }

    factory :admin do
      account_type { 'admin' }
    end
  end
end
