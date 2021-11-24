module Indicators
  def self.regenerate(changed_indicators)
    Indicators.constants.reject { |c| c == :DynamicIndicator }.each do |c|
      dynamic_indicator = Indicators.const_get(c)
      if (changed_indicators & dynamic_indicator::DEPENDS_ON).any?
        Rails.logger.info "Regenerating Indicators::#{c}"
        dynamic_indicator.regenerate
      end
    rescue NameError
      Rails.logger.warn "Indicators::#{c} not implementing DEPENDS_ON constant"
    end
  end
end
