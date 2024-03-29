require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/rails'

require 'test_prof/recipes/rspec/before_all'
require 'test_prof/recipes/rspec/let_it_be'

require 'super_diff/rspec-rails'

Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end
RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.request_snapshots_dir = 'spec/fixtures/snapshots'
  config.request_snapshots_dynamic_attributes = %w(id created_at updated_at region_id parent_id)
  config.request_snapshots_ignore_order = %w(indicator_values data)

  config.include FactoryBot::Syntax::Methods
  config.include FixtureFileHelper
  config.include RequestHelpers, type: :request
  config.include Rails.application.routes.url_helpers, type: :request

  config.include Devise::Test::IntegrationHelpers, type: :system
  config.include Devise::Test::IntegrationHelpers, type: :request
  config.include Warden::Test::Helpers

  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  config.before(:each, type: :request) do
    host! 'example.com' # removing default www.example.com otherwise we would get 301 redirects, check routes.rb
  end
end

class FactoryBot::SyntaxRunner
  include FixtureFileHelper
end
