ActionController::Renderers.add :csv do |obj, options|
  filename = options[:filename] || controller_name

  send_data obj, type: Mime[:csv], disposition: "attachment", filename: "#{filename}.csv"
end
