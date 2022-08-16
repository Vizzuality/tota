FactoryBot.define do
  factory :additional_resource_group do
    sequence(:name) { |n| "Group_#{n}" }
  end
end
