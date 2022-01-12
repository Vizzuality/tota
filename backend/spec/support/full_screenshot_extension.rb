if ENV['FULL_SCREENSHOT'] == 'true'
  require 'action_dispatch/system_test_case'

  module ActionDispatch::SystemTesting::TestHelpers::ScreenshotHelper
    def save_image
      page.save_screenshot(Rails.root.join(image_path), full: true)
    end
  end
end
