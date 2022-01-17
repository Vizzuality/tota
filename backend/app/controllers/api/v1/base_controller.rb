module API
  module V1
    class BaseController < ActionController::Base
      include API::Errors
      include API::Authentication
      include API::Filtering
    end
  end
end
