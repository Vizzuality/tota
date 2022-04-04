# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  name                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  account_type           :string           default("user"), not null
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  ACCOUNT_TYPES = %w[user admin].freeze
  enum account_type: array_to_enum_hash(ACCOUNT_TYPES), _default: 'user'

  has_many :region_permissions
  has_many :regions, through: :region_permissions

  validates :password,
            length: {minimum: 12, message: 'must be at least 12 characters long'},
            allow_nil: true
  validate :password_complexity

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, 'must include at least one lowercase letter, one uppercase letter, and one digit'
  end

  def visible_regions
    return Region.province.or(Region.tourism_region).active if admin?

    regions
  end

  def non_visible_regions
    return [] if admin?

    Region.where.not(id: visible_regions.ids)
  end

  def to_s
    email
  end
end
