require 'rails_helper'

RSpec.describe 'API V1 User', type: :request do
  describe 'GET user' do
    context 'not authenticated' do
      it 'should return unauthorized status' do
        get '/api/v1/user'

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'authenticated' do
      let(:user) { create(:user, email: 'user@example.com', name: 'Janek Kowalski') }
      before { sign_in user }

      context 'as user' do
        it 'should return user profile details' do
          get '/api/v1/user'

          expect(response).to have_http_status(:ok)
          expect(response_json).to eq({
            data: {
              email: 'user@example.com',
              name: 'Janek Kowalski',
              account_type: 'user'
            }
          }.as_json)
        end
      end
    end
  end
end
