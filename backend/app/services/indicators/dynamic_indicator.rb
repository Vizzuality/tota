module Indicators
  class DynamicIndicator
    include Singleton

    class << self
      delegate :regenerate, :generate, to: :instance
    end

    def generate
      raise NotImplementedError
    end

    def regenerate
      raise NotImplementedError
    end

    def create_indicator(slug)
      Indicator.create!(slug: slug, dynamic: true)
    end
  end
end
