class DevelopmentFundBlueprint < Blueprinter::Base
  identifier :id

  fields :project_title, :project_description, :region_id, :recipient, :lead_organization, :latitude, :longitude,
         :categories, :scope, :planning_area, :second_planning_area, :total_project_cost, :key_funding_amount,
         :key_funding_source, :funding_subtype, :funding_call_year, :funding_call_month, :project_status
end
