class API {
  baseURL = process.env.NEXT_PUBLIC_TOTA_API;
  baseConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  get(endpoint) {
    return fetch(`${this.baseURL}/${endpoint}`)
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
