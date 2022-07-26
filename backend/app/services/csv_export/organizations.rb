module CSVExport
  class Organizations
    def export(organizations)
      headers = %w[
        name_of_businessorganization
        company_id
        website
        business_type_1
        business_type_2
        tags
        indigenous_tourism
        biosphere_program_member
        accessibility
        tourism_region
        tourism_subregion
        latitude
        longitude
        show_on_platform
        source
      ]

      CSV.generate do |csv|
        csv << headers

        organizations.each do |o|
          csv << [
            o.name,
            o.external_company_id,
            o.website_url,
            o.business_type_1&.name,
            o.business_type_2&.name,
            o.tags,
            o.indigenous_ownership,
            o.biosphere_program_member,
            o.accessibility,
            o.region_name,
            o.subregion_name,
            o.latitude,
            o.longitude,
            o.show_on_platform,
            o.source
          ]
        end
      end
    end
  end
end
