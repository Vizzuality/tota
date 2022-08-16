module API
  module V1
    class AdditionalResourcesController < BaseController
      def index
        resources = AdditionalResource
          .includes(:region)
          .left_joins(:group)
          .where(filters)
          .order('additional_resource_groups.position')
        resources = policy_scope(resources)

        render json: AdditionalResourceBlueprint.render(
          resources,
          root: :data,
          fields: fields,
          user: current_user
        )
      end
    end
  end
end
