Blueprinter.configure do |config|
  config.if = ->(field_name, obj, options) do
    return true if options[:fields].blank?

    options[:fields].include?(field_name)
  end
end
