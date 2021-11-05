# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Rails.env.development?
  User.create!(email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin User')

  puts 'Executing import all rake task'
  Rake::Task['import:all'].invoke
end
