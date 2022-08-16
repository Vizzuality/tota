class AdditionalResourcePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      return scope.only_public if user.nil?
      return scope.all if user.admin?

      scope.only_public.or(scope.only_private.where(regions: user.visible_regions))
    end
  end
end
