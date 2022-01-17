module API
  Error = Class.new(StandardError)
  UnauthorizedError = Class.new(Error)

  module Errors
    def self.included(base)
      base.rescue_from StandardError, with: :render_standard_error unless Rails.env.test? || Rails.env.development?
      base.rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error
      base.rescue_from API::UnauthorizedError, with: :render_unauthorized_error
    end

    def render_error(exception)
      render json: {errors: [{title: exception.message.downcase}]}, status: :bad_request
    end

    def render_not_found_error(exception)
      render json: {errors: [{title: exception.message.downcase}]}, status: :not_found
    end

    def render_unauthorized_error(exception)
      render json: {errors: [{title: exception.message.downcase}]}, status: :unauthorized
    end

    def render_standard_error(_exception)
      # add error logging
      render json: {errors: [{title: 'Unexpected error'}]}, status: :internal_server_error
    end
  end
end
