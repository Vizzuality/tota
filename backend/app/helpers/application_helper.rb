module ApplicationHelper
  include Pagy::Frontend
  include Ransack::Helpers::FormHelper

  def sidebar_link_to(path, &block)
    classnames = {
      'sidebar-item': true,
      active: current_page?(path)
    }.reject { |_k, v| v == false }.keys

    content_tag :li, class: classnames do
      link_to path, class: 'sidebar-link', &block
    end
  end

  def select_collection(array, transform_func = :humanize)
    return unless array.respond_to?(:map)

    array.map do |s|
      return [s, s] unless s.respond_to?(transform_func)

      [s.send(transform_func), s]
    end
  end
end
