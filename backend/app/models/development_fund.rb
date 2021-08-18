class DevelopmentFund < ApplicationRecord
  belongs_to :region

  validates_presence_of :project_title
end
