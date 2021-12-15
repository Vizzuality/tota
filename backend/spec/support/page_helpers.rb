module PageHelpers
  def last(selector)
    all(selector).last
  end

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

  def within_div(text, &block)
    within(:xpath, ".//div[contains(normalize-space(.), '#{text}')]", &block)
  end

  def find_row(text)
    find(:xpath, ".//tr[contains(normalize-space(.), '#{text}')]")
  end

  def screenshot
    timestamp = Time.zone.now.strftime('%Y_%m_%d-%H_%M_%S')
    filename = "#{method_name}-#{timestamp}.png"
    screenshot_path = Rails.root.join('tmp', 'screenshots', filename)

    page.save_screenshot(screenshot_path)
  end
end
