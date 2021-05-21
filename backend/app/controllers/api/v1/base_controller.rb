module API
  module V1
    class BaseController < ActionController::API
      def filters
        result = params.permit(filter: {})[:filter]
        return unless result.respond_to?(:to_h)

        result.to_h.map do |k, v|
          v = v.split(',') if v.is_a?(String)
          [k, v.map(&:underscore)]
        end.to_h
      end

      def fields
        params[:fields]&.split(',')&.map(&:to_sym)
      end
    end
  end
end
