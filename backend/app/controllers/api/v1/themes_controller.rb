module API
  module V1
    class ThemesController < BaseController
      def index
        render json: ThemeBlueprint.render(
          Theme.where(filters),
          root: :data,
          fields: fields
        )
      end
    end
  end
end
