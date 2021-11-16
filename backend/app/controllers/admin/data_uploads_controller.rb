class Admin::DataUploadsController < Admin::AdminController
  include Admin::Resources

  def create
    @process = ::CSVImport::Process.new(resource_params)

    authorize @process.data_upload
    @resource = @process

    if @process.call
      redirect_to admin_data_uploads_path, notice: 'File was successfully imported'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def resource_class
    DataUpload
  end

  def scoped_collection(collection)
    collection.includes(:uploaded_by)
  end

  def permitted_params
    [
      :uploader,
      :file
    ]
  end
end
