module Auth
  class SessionsController < Devise::SessionsController
    after_action :remove_notice, only: [:destroy]

    private

    def remove_notice
      flash.discard(:notice)
    end
  end
end
