export interface getIndicatorsArgs {
  slug?: string | string[];
  region?: string | string[];
  category_1?: string | string[];
  category_2?: string | string[];
}

export interface getSingleIndicatorArgs {
  slug: string;
  region?: string | string[];
  category_1?: string | string[];
  category_2?: string | string[];
}

class API {
  baseURL = process.env.NEXT_PUBLIC_TOTA_API;
  baseConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  async getIndicators({ slug, region, category_1, category_2 }: getIndicatorsArgs): Promise<any> {
    const params = new URLSearchParams();
    const wrap = (x: string | string[]) => [x].flat().filter((x) => x);
    const slugArray = wrap(slug);
    const regionArray = wrap(region);
    const category_1Array = wrap(category_1);
    const category_2Array = wrap(category_2);
    if (slugArray.length > 0) params.append('filter[slug]', slugArray.join(','));
    if (regionArray.length > 0) params.append('filter[indicator_values.region]', regionArray.join(','));
    if (category_1Array.length > 0) params.append('filter[indicator_values.category_1]', category_1Array.join(','));
    if (category_2Array.length > 0) params.append('filter[indicator_values.category_2]', category_2Array.join(','));
    const queryString = Array.from(params).length > 0 ? `?${params.toString()}` : '';

    const indicatorsData = await this.get(`indicators${queryString}`);
    const byIndicatorSlug = {};
    indicatorsData.forEach((x: any) => {
      byIndicatorSlug[x.slug] = x.indicator_values;
    });
    return byIndicatorSlug;
  }

  getSingleIndicator({ slug, region, category_1, category_2 }: getSingleIndicatorArgs): Promise<any> {
    return this.getIndicators({ slug, region, category_1, category_2 }).then((data: any) => data[slug] || []);
  }

  get(endpoint: string) {
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
