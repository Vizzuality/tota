module API
  module Filtering
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
