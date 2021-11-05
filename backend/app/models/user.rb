class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :password,
            length: {minimum: 12, message: 'must be at least 12 characters long'},
            allow_nil: true
  validate :password_complexity

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, 'must include at least one lowercase letter, one uppercase letter, and one digit'
  end

  def to_s
    email
  end
end
