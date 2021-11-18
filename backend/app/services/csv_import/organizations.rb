module CSVImport
  class Organizations < BaseImporter
    def import
      organizations = []

      cleanup
      prepare_cache

      import_each_csv_row(csv) do |row|
        next if ActiveModel::Type::Boolean.new.cast(row[:show_on_platform]) == false

        organization = prepare_organization(row)

        organization.name = row[:name_of_businessorganization]
        organization.website_url = row[:website]
        organization.region = find_or_create_region(row)
        organization.business_type = find_or_create_business_type(row)
        organization.latitude = row[:latitude]
        organization.longitude = row[:longitude]
        organization.biosphere_program_member = row[:biosphere_program_member]
        organization.indigenous_tourism = row[:indigenous_tourism]
        organization.accessibility = row[:accessibility]

        organization.validate!
        organizations << organization
      end

      Organization.import! organizations, all_or_none: true
      regenerate_dynamic_indicators
    end

    private

    def cleanup
      Organization.delete_all
      BusinessType.delete_all
    end

    def regenerate_dynamic_indicators
      Indicators::EstablishmentsByType.regenerate
    end

    def required_headers
      [
        :name_of_businessorganization,
        :company_id,
        :website,
        :business_type,
        :business_subtype,
        :indigenous_tourism,
        :biosphere_program_member,
        :accessibility,
        :tourism_region,
        :tourism_subregion,
        :latitude,
        :longitude,
        :show_on_platform
      ]
    end

    def prepare_cache
      @regions = Region.all.map { |r| [r.name.downcase, r] }.to_h
      @business_types = BusinessType.all.map { |bt| [bt.name.downcase, bt] }.to_h
    end

    def find_or_create_business_type(row)
      type_name = row[:business_type]
      sub_type_name = row[:business_subtype]

      return unless type_name.present?

      type = @business_types[type_name.downcase] ||= BusinessType.create!(name: type_name)

      if sub_type_name.present?
        sub_type = @business_types[sub_type_name.downcase] ||= BusinessType.create!(name: sub_type_name, parent: type)
      end

      sub_type || type
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

    def prepare_organization(row)
      Organization.new
    end
  end
end
