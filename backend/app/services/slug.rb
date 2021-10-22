module Slug
  def create(str)
    str&.parameterize(separator: '_')
  end

  module_function :create
end
