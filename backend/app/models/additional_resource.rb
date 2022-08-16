# == Schema Information
#
# Table name: additional_resources
#
#  id         :bigint           not null, primary key
#  group_id   :bigint
#  region_id  :bigint           not null
#  public     :boolean          default(FALSE), not null
#  title      :string           not null
#  link       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AdditionalResource < ApplicationRecord
  belongs_to :group, class_name: 'AdditionalResourceGroup', optional: true
  belongs_to :region

  has_one_attached :file

  validates_presence_of :title
  validates :link, url: true
  validate :link_or_file_attached
  validate :both_link_and_file_not_attached

  scope :only_public, -> { where(public: true) }
  scope :only_private, -> { where(public: false) }

  def private?
    !public?
  end

  def url
    return link if link.present?
    return nil unless file.attached?

    Rails.application.routes.url_helpers.url_for file
  end

  private

  def link_or_file_attached
    return if file.attached? || link.present?

    errors.add :base, 'Link or file must be attached'
  end

  def both_link_and_file_not_attached
    return if !file.attached? || link.blank?

    errors.add :base, 'Please assign link or attach file, but not both'
  end
end
