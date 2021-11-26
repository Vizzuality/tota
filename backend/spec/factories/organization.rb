FactoryBot.define do
  factory :organization do
    name { 'Organization name' }
    latitude { 50.2323 }
    longitude { 34.2333 }

    source { 'TOTA members' }

    region
  end
end
