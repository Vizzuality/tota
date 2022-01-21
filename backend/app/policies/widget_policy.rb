class WidgetPolicy < ApplicationPolicy
  def update_position?
    true
  end

  class Scope < Scope
    def resolve
      return scope.only_public if user.nil?

      scope.all
    end
  end
end
