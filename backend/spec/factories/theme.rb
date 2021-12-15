FactoryBot.define do
  factory :theme do
    sequence(:slug) { |n| "theme_#{n}" }
    title { 'Accommodation Information' }
    description { 'Theme Description' }

    trait :with_widgets do
      after(:create) do |t|
        create :widget, slug: "#{t.slug}_widget_1", theme: t
        create :widget, slug: "#{t.slug}_widget_2", theme: t
      end
    end
  end
end
