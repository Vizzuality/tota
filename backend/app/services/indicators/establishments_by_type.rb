module Indicators
  class EstablishmentsByType
    include Singleton

    class << self
      delegate :generate, to: :instance
    end

    def generate
      Indicator.create(slug: 'establishments_by_type')

      generate_establishments_by_type('all')
      generate_establishments_by_type('biosphere')
    end

    def generate_establishments_by_type(category)
      organization_where = '1 = 1'
      organization_where = 'o.biosphere_program_member = true' if category == 'biosphere'

      sql = <<~SQL
        select
          (select id from indicators where slug = 'establishments_by_type' limit 1) as indicator_id,
          null as date,
          business_type as category_1,
          '#{category}' as category_2,
          region,
          count(*) as value,
          NOW() as created_at,
          NOW() as updated_at
        from
          (select
            coalesce(btp.name, bt.name) as business_type,
            coalesce(rp.name, r.name) as region
          from
            organizations o
            inner join business_types bt on bt.id = o.business_type_id
            left join business_types btp on btp.id = bt.parent_id
            inner join regions r on r.id = o.region_id
            left join regions rp on rp.id = r.parent_id
            where #{organization_where}
           ) as organizations
        group by region, business_type
      SQL

      result = ActiveRecord::Base.connection.execute(sql)
      return if result.count.zero?

      IndicatorValue.insert_all! result
    end
  end
end
