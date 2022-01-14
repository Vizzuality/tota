module API
  Error = Class.new(StandardError)
  UnauthorizedError = Class.new(Error)

  module V1
    class BaseController < ActionController::Base
      include Devise::Controllers::Helpers

      skip_before_action :verify_authenticity_token

      rescue_from StandardError, with: :render_standard_error unless Rails.env.test? || Rails.env.development?
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error
      rescue_from API::UnauthorizedError, with: :render_unauthorized_error

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

      def authenticate_user!
        raise API::UnauthorizedError, 'You need to sign in before making this request' if current_user.nil?
      end

      def filters
        result = params.permit(filter: {})[:filter]
        return unless result.respond_to?(:to_h)

        result.to_h.map do |k, v|
          v = v.split(',') if v.is_a?(String)
          v = v.map do |val|
            val == 'nil' ? nil : val
          end
          [k, v]
        end.to_h
      end

      def fields
        params[:fields]&.split(',')&.map(&:to_sym)
      end
    end
  end
end
