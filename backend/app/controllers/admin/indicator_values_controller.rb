class Admin::IndicatorValuesController < Admin::AdminController
  include Admin::Resources

  private

  def resource_class
    IndicatorValue
  end

  def scoped_collection(collection)
    collection
      .includes(:region, :indicator)
      .where(indicator: Indicator.imported)
      # .order('indicators.slug': :asc, 'regions.name': :asc, created_at: :desc)
  end

  def pagy_defaults
    {items: 50}
  end
end
