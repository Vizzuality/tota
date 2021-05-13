module API
  module V1
    class BaseController < ActionController::API
      def fields
        result = params.permit(fields: {})[:fields]
        return unless result.respond_to?(:to_h)

        result.to_h.map do |k, v|
          v = v.split(",") if v.is_a?(String)
          [k, v.map(&:underscore)]
        end.to_h
      end

      def included
        params.permit(include: []).to_h.symbolize_keys
      end
    end
  end
end
