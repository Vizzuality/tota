# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Rails.env.development?
  User.create!(email: 'admin@example.com', password: 'SuperSecret6', name: 'Admin User', account_type: 'admin')

  puts 'Executing import all rake task'
  Rake::Task['import:all'].invoke
  puts 'Adding themes and widgets'
  Rake::Task['themes:reimport'].invoke

  puts 'Making all widgets public'
  Widget.update_all(public: true)

  puts 'Adding example additional resources'

  AdditionalResource.delete_all
  AdditionalResourceGroup.delete_all

  doc_group = AdditionalResourceGroup.create!(name: 'Documents from participating regions')
  link_group = AdditionalResourceGroup.create!(name: 'Interesting links')
  others_group = AdditionalResourceGroup.create!(name: 'Others')

  Region.province_or_tourism_regions.each do |region|
    (1..3).to_a.sample.times do |n|
      r = AdditionalResource.new(title: "#{region.name} - document - #{n}", group: doc_group, region: region, public: true)
      r.file.attach(io: File.open(Rails.root.join('spec/fixtures/files/test.pdf')), filename: 'test.pdf')
      r.save!
    end

    (1..4).to_a.sample.times do |n|
      AdditionalResource.create!(
        title: "#{region.name} - link - #{n}",
        group: link_group,
        region: region,
        public: true,
        link: 'https://example.com'
      )
    end

    AdditionalResource.create!(
      title: "#{region.name} - private link",
      group: link_group,
      region: region,
      public: false,
      link: 'https://example.com'
    )

    (1..4).to_a.sample.times do |n|
      AdditionalResource.create!(
        title: "#{region.name} - other link - #{n}",
        group: others_group,
        region: region,
        public: true,
        link: 'https://example.com'
      )
    end
  end
end
