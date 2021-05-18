module API
  module V1
    class OrganizationsController < BaseController
      def index
        render json: OrganizationBlueprint.render(
          Organization.all.includes(:region, :business_type),
          root: :data
        )
      end
    end
  end
end
