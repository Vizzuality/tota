module CSVImport
  class DevelopmentFunds < BaseImporter
    def import
      funds = []

      prepare_cache

      import_each_csv_row(csv) do |row|
        fund = DevelopmentFund.new

        fund.project_title = row[:project_title]
        fund.project_description = row[:project_description]
        fund.region = find_or_create_region(row)
        fund.recipient = row[:recipient]
        fund.lead_organization = row[:lead_organization]
        fund.location = row[:location]
        fund.latitude = row[:latitude]
        fund.longitude = row[:longitude]
        fund.categories = row[:categories_tags]&.split(',')&.map(&:strip)
        fund.scope = row[:scope]
        fund.planning_area = row[:planning_area]
        fund.second_planning_area = row[:second_planning_area]
        fund.total_project_cost = row[:total_project_cost]
        fund.key_funding_amount = row[:key_funding_amount]
        fund.key_funding_source = row[:key_funding_source]
        fund.funding_subtype =  row[:funding_subtype]
        fund.project_status = row[:project_status]
        fund.funding_call_year = row[:funding_call_year]&.to_i
        fund.funding_call_month = row[:funding_call_month]

        fund.validate!
        funds << fund
      end

      DevelopmentFund.import! funds, all_or_none: true
    end

    private

    def required_headers
      [
        :project_title,
        :project_description,
        :recipient,
        :lead_organization,
        :tourism_region,
        :location,
        :latitude,
        :longitude,
        :categories_tags,
        :scope,
        :planning_area,
        :second_planning_area,
        :total_project_cost,
        :key_funding_amount,
        :key_funding_source,
        :funding_subtype,
        :funding_call_year,
        :funding_call_month,
        :project_status
      ]
    end

    def prepare_cache
      @regions = Region.all.map { |r| [r.name.downcase, r] }.to_h
    end

    def find_or_create_region(row)
      region_name = row[:tourism_region]
      return unless region_name.present?

      @regions[region_name.downcase] ||= Region.create!(name: region_name)
    end
  end
end
