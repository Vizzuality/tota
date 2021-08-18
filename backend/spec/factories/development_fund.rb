FactoryBot.define do
  factory :development_fund do
    project_title { 'Project title' }

    latitude { 50.2323 }
    longitude { 34.2333 }

    key_funding_source { 'Source' }
    funding_subtype { 'Subtype' }

    region
  end
end
