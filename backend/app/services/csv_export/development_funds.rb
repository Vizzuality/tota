module CSVExport
  class DevelopmentFunds
    def export(development_funds)
      headers = %w[
        project_title
        project_description
        recipient
        lead_organization
        tourism_region
        location
        latitude
        longitude
        categories_tags
        scope
        planning_area
        second_planning_area
        total_project_cost
        key_funding_amount
        key_funding_source
        funding_subtype
        funding_call_year
        funding_call_month
        project_status
      ]

      CSV.generate do |csv|
        csv << headers

        development_funds.each do |d|
          csv << [
            d.project_title,
            d.project_description,
            d.recipient,
            d.lead_organization,
            d.region.name,
            d.location,
            d.latitude,
            d.longitude,
            d.categories&.join(','),
            d.scope,
            d.planning_area,
            d.second_planning_area,
            d.total_project_cost,
            d.key_funding_amount,
            d.key_funding_source,
            d.funding_subtype,
            d.funding_call_year,
            d.funding_call_month,
            d.project_status
          ]
        end
      end
    end
  end
end
