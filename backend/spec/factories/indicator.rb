FactoryBot.define do
  factory :indicator do
    theme

    name { 'Visitors by origin monthly' }
    code { 'visitors_by_origin_monthly' }
    unit { 'people' }
  end
end
