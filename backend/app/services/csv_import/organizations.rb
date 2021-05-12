module CSVImport
  class Organizations < BaseImporter
    def import
      import_each_csv_row(csv) do |row|
        organization = prepare_organization(row)

        organization.name = row[:name]
        organization.region = find_or_create_region(row)
        organization.business_type = find_or_create_business_type(row)
        organization.latitude = row[:latitude]
        organization.longitude = row[:longitude]

        organization.save!
      end
    end

    private

    def find_or_create_business_type(row)
      type_name = row[:business_type]
      sub_type_name = row[:business_sub_type]

      return unless type_name.present?

      type = BusinessType.where('lower(name) = ?', type_name.downcase).first ||
        BusinessType.create!(name: type_name)

      if sub_type_name.present?
        sub_type = BusinessType.where('lower(name) = ?', sub_typ_name.downcase).first ||
          BusinessType.create!(name: sub_type_name, parent: type)
      end

      type || sub_type
    end

    def find_or_create_region(row)
      region_name = row[:tourism_region]
      sub_region_name = row[:tourism_sub_region]

      return unless region_name.present?

      region = Region.where('lower(name) = ?', region_name.downcase).first ||
        Region.create!(name: region_name)

      if sub_region_name.present?
        sub_region = Region.where('lower(name) = ?', sub_region_name.downcase).first ||
          Region.create!(name: sub_region_name, parent: region)
      end

      region || sub_region
    end

    def prepare_organization(row)
      Organization.find_by(external_company_id: row[:company_id]) ||
        Organization.new
    end
  end
end
