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

  # override because cuprite at least on CI has problem with clicking on
  # elements outside window view
  def click_on(locator = nil, **options)
    link_or_button = find(:link_or_button, locator, **options)
    unless in_viewport?(link_or_button)
      page.scroll_to(link_or_button, align: :center)
      sleep 0.3 # dunno why have to wait on CI
    end
    link_or_button.click
  end

  def in_viewport?(element)
    evaluate_script("(function(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    })(arguments[0]);", element)
  end
end
