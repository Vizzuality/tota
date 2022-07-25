module CSVImport
  class Organizations < BaseImporter
    def import
      organizations = []
      imported_region_names = []

      prepare_cache

      import_each_csv_row(csv) do |row|
        organization = prepare_organization(row)

        organization.name = row[:name_of_businessorganization]
        organization.external_company_id = row[:company_id]
        organization.website_url = row[:website]
        organization.region = find_or_create_region(row)
        organization.business_type_1 = find_or_create_business_type(row[:business_type_1])
        organization.business_type_2 = find_or_create_business_type(row[:business_type_2])
        organization.latitude = row[:latitude]
        organization.longitude = row[:longitude]
        organization.biosphere_program_member = row[:biosphere_program_member]
        organization.indigenous_ownership = row[:indigenous_tourism]
        organization.accessibility = row[:accessibility]
        organization.show_on_platform = row[:show_on_platform]
        organization.source = row[:source]

        organization.validate!
        organizations << organization

        imported_region_names << row[:tourism_region] unless imported_region_names.include?(row[:tourism_region])
      end

      cleanup_organizations_for_regions(imported_region_names)
      Organization.import! organizations, all_or_none: true
      regenerate_dynamic_indicators
    end

    private

    def cleanup_organizations_for_regions(region_names)
      region_ids = region_names.map(&:downcase).map { |name| @regions[name] }.map(&:id)
      subregion_ids = Region.where(id: region_ids).includes(:subregions).flat_map(&:subregion_ids)
      Organization.where(region: region_ids + subregion_ids).delete_all
    end

    def regenerate_dynamic_indicators
      Indicators::EstablishmentsByType.regenerate
    end

    def required_headers
      [
        :name_of_businessorganization,
        :company_id,
        :website,
        :business_type_1,
        :business_type_2,
        :indigenous_tourism,
        :biosphere_program_member,
        :accessibility,
        :tourism_region,
        :tourism_subregion,
        :latitude,
        :longitude,
        :show_on_platform,
        :source
      ]
    end

    def prepare_cache
      @regions = Region.all.map { |r| [r.name.downcase, r] }.to_h
      @business_types = BusinessType.all.map { |bt| [bt.name.downcase, bt] }.to_h
    end

    def find_or_create_business_type(business_type)
      return unless business_type.present?

      @business_types[business_type.downcase] ||= BusinessType.create!(name: business_type)
    end

    def find_or_create_region(row)
      region_name = row[:tourism_region]
      sub_region_name = row[:tourism_subregion]

      return unless region_name.present?

      region = @regions[region_name.downcase] ||= Region.create!(name: region_name, region_type: 'tourism_region')

      if sub_region_name.present?
        sub_region = @regions[sub_region_name.downcase] ||= Region.create!(
          name: sub_region_name, region_type: 'tourism_subregion', parent: region
        )
      end

      sub_region || region
    end

    def prepare_organization(_row)
      Organization.new
    end
  end
end
