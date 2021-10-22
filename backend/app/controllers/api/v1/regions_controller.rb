module API
  module V1
    class RegionsController < BaseController
      def index
        render json: RegionBlueprint.render(
          Region.active.where(filters).includes(:parent),
          root: :data,
          fields: fields
        )
      end
    end
  end
end
