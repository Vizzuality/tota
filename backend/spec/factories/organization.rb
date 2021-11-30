FactoryBot.define do
  factory :organization do
    name { 'Organization name' }
    latitude { 50.2323 }
    longitude { 34.2333 }
    external_company_id { 'ID434534' }
    indigenous_tourism { false }
    accessibility { false }
    biosphere_program_member { false }
    website_url { 'www.example.com' }
    show_on_platform { true }

    source { 'TOTA members' }

    region
  end
end
