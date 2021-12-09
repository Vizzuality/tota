namespace :themes do
  desc 'First remove all existing themes then adding defined ones in themes.yml'
  task reimport: :environment do
    if Rails.env.production? && !ENV['FORCE'].present?
      puts 'PRODUCTION MODE - use ENV FORCE to perform this action'
      next
    end

    Theme.load_config(cleanup: true)
    puts 'All themes reimported!'
  end

  desc 'Updates existing themes with new themes, removes non existent'
  task update: :environment do
    Theme.load_config(cleanup: false)
    puts 'Themes updated!'
  end
end
