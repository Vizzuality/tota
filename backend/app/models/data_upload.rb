class DataUpload < ApplicationRecord
  has_one_attached :file

  UPLOADERS = {
    'TOTA Members' => 'Organizations',
    'Development Funds' => 'DevelopmentFunds',
    'Indicators' => 'Indicators'
  }.freeze

  belongs_to :uploaded_by, class_name: 'User'

  validates :file, attached: true, content_type: {in: ['text/csv', 'application/vnd.ms-excel']}
  validates :uploader, presence: true
  validates :uploader, inclusion: {in: UPLOADERS.values, unless: -> { uploader.blank? }}

  before_validation :set_uploaded_by

  def uploaded_at
    created_at
  end

  def to_s
    "#{uploader} upload - id: #{id}"
  end

  private

  def set_uploaded_by
    self.uploaded_by = Current.user
  end
end
