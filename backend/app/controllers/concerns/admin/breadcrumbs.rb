module Admin::Breadcrumbs
  extend ActiveSupport::Concern

  included do
    helper_method :breadcrumbs
  end

  def breadcrumbs
    @breadcrumbs ||= []
  end

  def add_breadcrumb(title, path = nil)
    breadcrumbs << Site::Breadcrumb.new(title, path)
  end
end
