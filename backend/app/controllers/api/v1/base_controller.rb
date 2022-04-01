module API
  module V1
    class BaseController < ActionController::Base
      include API::Errors
      include API::Authentication
      include API::Filtering
      include Pundit::Authorization

      wrap_parameters format: [:json]
    end
  end
end
