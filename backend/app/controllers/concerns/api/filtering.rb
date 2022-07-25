module API
  module Filtering
    def filter_params
      params[:filter]&.to_unsafe_h || {}
    end

    def filters
      return unless filter_params.respond_to?(:to_h)

      filter_params.to_h.filter_map do |k, v|
        v = v.split(',') if v.is_a?(String)
        v = v.map do |val|
          val == 'nil' ? nil : val
        end
        key = if filter_keys_map.key?(k.to_s)
                filter_keys_map[k.to_s]
              else
                k
              end
        next unless key.present?

        [key, v]
      end.to_h
    end

    def fields
      params[:fields]&.split(',')&.map(&:to_sym)
    end

    def filter_keys_map
      {}
    end
  end
end
