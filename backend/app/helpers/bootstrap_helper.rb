module BootstrapHelper
  BOOTSTRAP_FLASH_CLASSES = {
    notice: 'alert-success',
    success: 'alert-success',
    info: 'alert-info',
    error: 'alert-danger',
    alert: 'alert-danger'
  }.freeze

  def bootstrap_class_for(type)
    BOOTSTRAP_FLASH_CLASSES.fetch(type.to_sym, type.to_s)
  end

  def bootstrap_devise_error_messages
    return '' if resource.errors.empty?

    messages = resource.errors.full_messages.map { |message| content_tag(:li, message) }.join
    sentence = I18n.t(
      'errors.messages.not_saved',
      count: resource.errors.count,
      resource: resource.class.model_name.human.downcase
    )

    html = <<-HTML
    <div class="alert alert-danger alert-dismissable" role="alert">
      #{bootstrap_close_button_tag(dismiss: 'alert')}
      <h4>#{sentence}
      <ul class="mb-0">#{messages}</ul>
    </div>
    HTML

    html.html_safe
  end

  def message_box(type:, &block)
    content_tag :div, class: "alert #{bootstrap_class_for(type)}", role: 'alert' do
      yield if block.present?
    end
  end

  def bootstrap_close_button_tag(dismiss: 'modal')
    button_tag(type: 'button', class: 'btn-close', aria: {label: 'Close'}, data: {'bs-dismiss': dismiss}) do
    end
  end

  def dropdown(text, options = {}, &block)
    id = SecureRandom.uuid
    css_class = options.fetch(:class, '')
    toggle_class = options.dig(:toggle, :class) || 'btn btn-outline-primary'

    content_tag :div, class: "dropdown #{css_class}" do
      el = []
      el << content_tag(:button, class: "#{toggle_class} dropdown-toggle", type: 'button', id: id, 'data-bs-toggle': 'dropdown',
                                 'aria-expanded': false) do
        text
      end
      el << content_tag(:ul, class: 'dropdown-menu', 'aria-labelledby': id) do
        yield if block.present?
      end
      el.join.html_safe
    end
  end

  def status_tag(text)
    return if text.nil?

    key, display = if text.is_a? Array
                     text
                   elsif text == true
                     [:yes, 'Yes']
                   elsif text == false
                     [:no, 'No']
                   else
                     [text.to_sym, text.to_s.humanize]
                   end

    content_tag :span, display, class: "badge badge-#{key.downcase}"
  end

  def card(header_text, options = {}, &block)
    return if header_text.nil?

    css_class = options.fetch(:class, '')

    content_tag :div, class: "card #{css_class}" do
      ''.tap do |c|
        c << content_tag(:div, header_text, class: 'card-header')
        c << content_tag(:div, class: 'card-body') do
          yield if block.present?
        end
      end.html_safe
    end
  end
end
