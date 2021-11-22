FactoryBot.define do
  factory :development_fund do
    project_title { 'Project title' }
    project_description { 'Description' }
    recipient { 'Recipient' }
    lead_organization { 'Lead organization' }
    location { 'Location' }
    categories { %w(category1 category2) }
    scope { 'Scope' }
    planning_area { 'Planning Area' }
    second_planning_area { 'Second Planning Area' }
    total_project_cost { 23_243 }
    key_funding_amount { 3453 }
    key_funding_source { 'Source' }
    funding_subtype { 'Subtype' }
    funding_call_year { 2020 }
    funding_call_month { 'January' }
    project_status { 'In Progress' }

    latitude { 50.2323 }
    longitude { 34.2333 }

    region
  end
end
