FactoryBot.define do
  factory :additional_resource do
    title { 'Additional resource title' }
    link { 'https://example.com' }
    public { true }

    region

    trait :private do
      public { false }
    end

    factory :additional_resource_file do
      link { nil }
      file { fixture_file 'test.pdf' }
    end
  end
end
