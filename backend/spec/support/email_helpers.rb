module EmailHelpers
  def last_email_to(email)
    ActionMailer::Base.deliveries.last { |mail| mail.to.include?(email) }
  end
end
