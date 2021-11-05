class Admin::AdminController < Admin::ApplicationController
  include Admin::Authorization
  include Admin::Breadcrumbs
  include Pagy::Backend

  layout 'admin'
end
