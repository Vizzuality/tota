module API
  module V1
    class OrganizationsController < BaseController
      def index
        render json: OrganizationSerializer.new(
          Organization.all.includes(:region, :business_type), fields: fields
        )
      end
    end
  end
end
