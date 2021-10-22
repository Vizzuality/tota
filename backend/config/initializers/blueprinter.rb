Blueprinter.configure do |config|
  config.sort_fields_by = :definition

  config.if = ->(field_name, obj, options) do
    return true if options[:fields].blank?

    options[:fields].include?(field_name)
  end
end
