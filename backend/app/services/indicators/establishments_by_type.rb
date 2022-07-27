module Indicators
  class EstablishmentsByType < DynamicIndicator
    DEPENDS_ON = [].freeze

    def regenerate
      Indicator.find_by(slug: 'establishments_by_type')&.delete
      Indicator.find_by(slug: 'total_establishments')&.delete
      generate
    end

    def generate
      create_indicator('establishments_by_type')
      create_indicator('total_establishments')

      %w(tourism_region province).each do |region_type|
        generate_establishments_by_type('all', region_type)
        generate_establishments_by_type('biosphere', region_type)
        generate_establishments_by_type('accessibility', region_type)
        generate_establishments_by_type('indigenous', region_type)
        generate_total_establishments_by_region(region_type)
      end
    end

    def generate_total_establishments_by_region(region_type)
      sql = <<~SQL
        with searched_regions as (select id from regions where region_type = '#{region_type}')
        select
          (select id from indicators where slug = 'total_establishments' limit 1) as indicator_id,
          null as date,
          null as category_1,
          null as category_2,
          region_id,
          count(*) as value,
          NOW() as created_at,
          NOW() as updated_at
        from
          (select
            sr.id as region_id
          from
            organizations o
            inner join regions r on r.id = o.region_id
            left join regions rp on rp.id = r.parent_id
            left join regions rp2 on rp2.id = rp.parent_id
            left join searched_regions sr on sr.id in (r.id, rp.id, rp2.id)
           ) as organizations
        where region_id is not null
        group by region_id
      SQL

      result = ActiveRecord::Base.connection.execute(sql)
      return if result.count.zero?

      IndicatorValue.insert_all! result
    end

    def generate_establishments_by_type(category, region_type)
      organization_where = '1 = 1'
      organization_where = 'o.biosphere_program_member = true' if category == 'biosphere'
      organization_where = 'o.accessibility = true' if category == 'accessibility'
      organization_where = 'o.indigenous_ownership = true' if category == 'indigenous'

      sql = <<~SQL
        with searched_regions as (select id from regions where region_type = '#{region_type}')
        select
          (select id from indicators where slug = 'establishments_by_type' limit 1) as indicator_id,
          null as date,
          business_type as category_1,
          '#{category}' as category_2,
          region_id,
          count(*) as value,
          NOW() as created_at,
          NOW() as updated_at
        from
          (select
            bt.name as business_type,
            sr.id as region_id
          from
            organizations o
            inner join business_types bt on bt.id = o.business_type_1_id or bt.id = o.business_type_2_id
            inner join regions r on r.id = o.region_id
            left join regions rp on rp.id = r.parent_id
            left join regions rp2 on rp2.id = rp.parent_id
            left join searched_regions sr on sr.id in (r.id, rp.id, rp2.id)
            where #{organization_where}
           ) as organizations
        where region_id is not null
        group by region_id, business_type
      SQL

      result = ActiveRecord::Base.connection.execute(sql)
      return if result.count.zero?

      IndicatorValue.insert_all! result
    end
  end
end
