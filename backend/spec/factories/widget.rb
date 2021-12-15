FactoryBot.define do
  factory :widget do
    sequence(:slug) { |n| "visitors_#{n}" }
    title { 'Widget title' }
    sub_title { 'Widget subtitle' }
    description { 'Widget description' }
    note { 'Widget note' }
    sources { build_list(:source, 3) }

    theme
  end
end
