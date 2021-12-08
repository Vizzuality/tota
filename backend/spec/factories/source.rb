FactoryBot.define do
  factory :source do
    text { 'Source text' }
    link { 'https://example.com' }
    note { 'Source note' }
  end
end
