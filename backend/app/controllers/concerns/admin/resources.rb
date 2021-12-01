module Admin::Resources
  extend ActiveSupport::Concern

  included do
    before_action :set_resource, only: [:edit, :show, :update, :destroy]
    before_action :authorize_resource, only: [:edit, :show, :update, :destroy]
    before_action :set_breadcrumbs, except: [:index]

    after_action :verify_authorized, except: [:index]
    after_action :verify_policy_scoped, only: [:index]

    helper_method :redirect_params
  end

  # GET /resources
  def index
    authorize resource_class

    @q = resource_class.ransack(params[:q])
    collection = policy_scope(scoped_collection(@q.result))

    respond_to do |format|
      format.html do
        @pagy, @resources = pagy(collection, pagy_defaults)
      end
      format.csv do
        render csv: csv_exporter.export(collection),
               filename: resource_name.pluralize.parameterize.underscore
      end
    end
  end

  # GET /resources/1
  def show
    title = @resource.try(:name) || @resource.try(:title) || @resource.to_s
    add_breadcrumb(title)
  end

  # GET /resources/new
  def new
    @resource = resource_class.new(resource_params)

    authorize @resource

    add_breadcrumb("New #{resource_name}")
  end

  # GET /resources/1/edit
  def edit
    title = @resource.try(:name) || @resource.try(:title) || @resource.to_s
    add_breadcrumb(title)
  end

  # POST /resources
  def create
    @resource = resource_class.new(resource_params)

    authorize @resource

    if @resource.save
      redirect_to resources_url, notice: "#{resource_name} was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /resources/1
  def update
    if @resource.update(resource_params)
      redirect_to resources_url, notice: "#{resource_name} was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /resources/1
  def destroy
    @resource.destroy
    redirect_to resources_url(redirect_params), notice: "#{resource_name} was successfully destroyed."
  end

  private

  # actions

  def set_breadcrumbs
    add_breadcrumb(resource_name, resources_url)
  end

  def set_resource
    @resource = resource_class.find(params[:id])
  end

  def authorize_resource
    authorize @resource
  end

  # end of actions

  def resource_params
    resource_param = resource_class.to_s.underscore.to_sym
    return {} if params[resource_param].blank?

    params.require(resource_param).permit(*permitted_params)
  end

  # to keep on the same page with the same filters
  def redirect_params
    params.slice(:q, :page).to_unsafe_h
  end

  # to reimplement in controllers

  def permitted_params
    []
  end

  def scoped_collection(collection)
    collection
  end

  def resource_class
    raise 'Method not implemented'
  end

  # end of to reimplement in controllers

  def resources_url(*args)
    send("admin_#{resource_class.to_s.underscore.pluralize}_url", *args)
  end

  def edit_resource_url(*args)
    send("edit_admin_#{resource_class.to_s.underscore}_url", *args)
  end

  def edit_resource_path(*args)
    send("edit_admin_#{resource_class.to_s.underscore}_path", *args)
  end

  def resource_name
    resource_class.to_s.titleize
  end

  def pagy_defaults
    {}
  end

  def csv_exporter
    exporter_name = resource_class.name.pluralize
    CSVExport.const_get(exporter_name).new
  rescue NameError
    raise "Can't find 'CSVExport::#{exporter_name}' exporter service class!"
  end
end
