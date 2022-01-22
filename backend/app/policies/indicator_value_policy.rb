class IndicatorValuePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      return scope.only_public if user.nil?
      return scope.all if user.admin?
      return scope.all if user.non_visible_regions.empty?

      scope.where(regions: user.visible_regions)
        .or(scope.only_public.where(regions: user.non_visible_regions))
    end
  end
end
