const isServer = typeof window === 'undefined';

function CSRFToken() {
  const csrfCookie = document.cookie.split('; ').find((c) => c.startsWith('csrf_token='));
  if (!csrfCookie) return '';
  return csrfCookie.split('=')[1];
}

class API {
  baseURL = isServer
    ? process.env.NEXT_PUBLIC_TOTA_BACKEND_HOST + process.env.NEXT_PUBLIC_TOTA_API_PATH
    : process.env.NEXT_PUBLIC_TOTA_API_PATH;
  baseConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  get(endpoint: string): Promise<any> {
    return this._request(endpoint, 'GET');
  }

  post(endpoint: string): Promise<any> {
    return this._request(endpoint, 'POST');
  }

  put(endpoint: string): Promise<any> {
    return this._request(endpoint, 'PUT');
  }

  delete(endpoint: string): Promise<any> {
    return this._request(endpoint, 'DELETE');
  }

  _request(endpoint: string, method: string) {
    return fetch(`${this.baseURL}/${endpoint}`, {
      method,
      headers: {
        ...this.baseConfig.headers,
        'X-CSRF-Token': CSRFToken(),
      },
    })
      .then(this._handleResponse)
      .then((d) => d.data);
  }

  _handleResponse(d) {
    if (d.status >= 200 && d.status <= 300) {
      const data = typeof d.json === 'function' ? d.json() : d;
      data.json = () => data;
      return data;
    }
    throw new Error(d.statusText);
  }
}

const TotaAPI = new API();

export default TotaAPI;
