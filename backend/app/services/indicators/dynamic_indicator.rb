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
  end
end
