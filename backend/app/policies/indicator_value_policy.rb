class IndicatorValuePolicy < ApplicationPolicy
  class APIScope < Scope
    def resolve
      return scope.only_public if user.nil?
      return scope.for_configured_indicators if user.admin?
      return scope.for_configured_indicators if user.non_visible_regions.empty?

      scope.for_configured_indicators.where(regions: user.visible_regions)
        .or(scope.only_public.where(regions: user.non_visible_regions))
    end
  end
end
