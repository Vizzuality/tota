module API
  module V1
    class DevelopmentFundsController < BaseController
      def index
        render json: DevelopmentFundBlueprint.render(
          DevelopmentFund.where(filters).includes(:region),
          root: :data,
          fields: fields
        )
      end
    end
  end
end
