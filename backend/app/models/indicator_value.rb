class IndicatorValue < ApplicationRecord
  belongs_to :indicator

  validates_presence_of :value

  class << self
    def with_dynamic_indicators
      indicators = IndicatorValue.all.select(:indicator_id, :date, :category_1, :category_2, :region, :value)

      from("(#{indicators.to_sql} UNION #{establishments_by_type.to_sql}) AS indicator_values")
        .order(:indicator_id, :region, :date, :category_1)
    end

    def establishments_by_type
      sql = <<~SQL
        (select
            (select id from indicators where slug = 'establishments_by_type') as indicator_id,
            null as date,
            business_type as category_1,
            null as category_2,
            region,
            count(*) as value
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
             ) as organizations
          group by region, business_type
        ) as indicator_values
      SQL

      from(sql)
    end
  end
end
