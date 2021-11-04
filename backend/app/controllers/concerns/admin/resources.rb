module Admin::Resources
  extend ActiveSupport::Concern

  included do
    before_action :set_resource, only: [:edit, :show, :update, :destroy]
    before_action :authorize_resource, only: [:edit, :show, :update, :destroy]
    before_action :set_breadcrumbs, except: [:index, :batch_delete]

    after_action :verify_authorized, except: [:index, :batch_delete]
    after_action :verify_policy_scoped, only: [:index, :batch_delete]

    helper_method :redirect_params
  end

  # GET /resources
  def index
    authorize resource_class

    @q = resource_class.ransack(params[:q])
    @pagy, @resources = pagy(policy_scope(scoped_collection(@q.result)), pagy_defaults)
  end

  # GET /resources/1
  def show
    title = @resource.try(:name) || @resource.try(:title) || @resource.to_s
    add_breadcrumb(title)
  end

  # GET /resources/new
  def new
    @resource = resource_class.new

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

  def batch_delete
    @resources = if params[:ids] == 'all'
                   resource_class.all
                 else
                   resource_class.where(id: params[:ids].split(','))
                 end
    @resources = policy_scope(@resources)
    @resources.destroy_all

    redirect_to resources_url(redirect_params), notice: "#{resource_name.pluralize} were sucessfully destroyed",
                                                status: :see_other
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
    params.require(resource_class.to_s.downcase.to_sym).permit(*permitted_params)
  end

  # to keep on the same page with the same filters
  def redirect_params
    params.permit(:q, :page).to_h
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
end
