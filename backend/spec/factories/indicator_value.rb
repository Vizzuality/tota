FactoryBot.define do
  factory :indicator_value do
    indicator
    region

    category_1 { 'Canada' }
    value { '2000' }
  end
end
