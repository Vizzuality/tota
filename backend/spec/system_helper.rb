require 'capybara/cuprite'
require 'rails_helper'

Capybara.default_max_wait_time = 2
Capybara.default_normalize_ws = true

Capybara.register_driver(:cuprite) do |app|
  Capybara::Cuprite::Driver.new(
    app,
    **{
      window_size: [1200, 800],
      # See additional options for Dockerized environment in the respective section of this article
      browser_options: {},
      # Increase Chrome startup wait time (required for stable CI builds)
      process_timeout: 10,
      # Enable debugging capabilities
      inspector: true,
      # Allow running Chrome in a headful mode by setting HEADLESS env
      # var to a falsey value
      headless: true
    }
  )
end

# Configure Capybara to use :cuprite driver by default
Capybara.default_driver = Capybara.javascript_driver = :cuprite

module CupriteHelpers
  # Drop #pause anywhere in a test to stop the execution.
  # Useful when you want to checkout the contents of a web page in the middle of a test
  # running in a headful mode.
  def pause
    page.driver.pause
  end

  # Drop #debug anywhere in a test to open a Chrome inspector and pause the execution
  def debug(*args)
    page.driver.debug(*args)
  end
end

module PageHelpers
  def within_cell(row, column, &block)
    within_row(row) do
      within_column(column, &block)
    end
  end

  def within_column(column, &block)
    within(:xpath, "//table/tbody/tr/td[count(//table/thead/tr/th[normalize-space()='#{column}']/preceding-sibling::th)+1]", &block)
  end

  def within_row(text, &block)
    within(:xpath, ".//tr[contains(normalize-space(.), '#{text}')]", &block)
  end

  def within_card(text, &block)
    within(:xpath, "(.//div[contains(concat(' ', normalize-space(@class), ' '), ' card-header ') and contains(., '#{text}')]/..)[1]", &block)
  end

  def find_row(text)
    find(:xpath, ".//tr[contains(normalize-space(.), '#{text}')]")
  end
end

RSpec.configure do |config|
  config.include CupriteHelpers, type: :system
  config.include PageHelpers, type: :system

  config.around(:each, type: :system) do |ex|
    was_host = Rails.application.default_url_options[:host]
    Rails.application.default_url_options[:host] = Capybara.server_host
    ex.run
    Rails.application.default_url_options[:host] = was_host
  end

  config.prepend_before(:each, type: :system) do
    driven_by Capybara.javascript_driver
  end

  config.before(:suite) do
    Rails.application.load_tasks
    `yarn build`
    `yarn build:css`
    Rake::Task['assets:precompile'].execute
  end
end
