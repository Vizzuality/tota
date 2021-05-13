module CSVImport
  class Organizations < BaseImporter
    def import
      organizations = []

      prepare_cache

      import_each_csv_row(csv) do |row|
        organization = prepare_organization(row)

        organization.name = row[:name]
        organization.region = find_or_create_region(row)
        organization.business_type = find_or_create_business_type(row)
        organization.latitude = row[:latitude]
        organization.longitude = row[:longitude]

        organization.validate!
        # organization.save!
        organizations << organization
      end

      Organization.import! organizations, all_or_none: true
    end

    private

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
        sub_type = @business_types[sub_type_name.downcase] ||= BusinessType.create!(name: sub_type_name)
      end

      type || sub_type
    end

    def find_or_create_region(row)
      region_name = row[:tourism_region]
      sub_region_name = row[:tourism_subregion]

      return unless region_name.present?

      region = @regions[region_name.downcase] ||= Region.create!(name: region_name)

      if sub_region_name.present?
        sub_region = @regions[sub_region_name.downcase] ||= Region.create!(name: sub_region_name)
      end

      region || sub_region
    end

    def prepare_organization(row)
      Organization.find_by(external_company_id: row[:company_id]) ||
        Organization.new
    end
  end
end