import type { IndicatorValue } from 'types';

export interface GetIndicatorsArgs {
  slug?: string | string[];
  region?: string | string[];
  category_1?: string | string[];
  category_2?: string | string[];
}

interface GetIndicatorsResult {
  [propName: string]: IndicatorValue[];
}

interface GetSingleIndicatorArgs extends GetIndicatorsArgs {
  slug: string;
}

class API {
  baseURL = process.env.NEXT_PUBLIC_TOTA_API;
  baseConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  async getIndicators({ slug, region, category_1, category_2 }: GetIndicatorsArgs): Promise<GetIndicatorsResult> {
    const params = new URLSearchParams();
    const wrap = (x: string | string[]) => [x].flat().filter((x) => x);
    const slugArray = wrap(slug);
    const regionArray = wrap(region);
    const category_1Array = wrap(category_1);
    const category_2Array = wrap(category_2);
    if (slugArray.length > 0) params.append('filter[slug]', slugArray.join(','));
    if (regionArray.length > 0) params.append('filter[region.name]', regionArray.join(','));
    if (category_1Array.length > 0) params.append('filter[indicator_values.category_1]', category_1Array.join(','));
    if (category_2Array.length > 0) params.append('filter[indicator_values.category_2]', category_2Array.join(','));
    const queryString = Array.from(params).length > 0 ? `?${params.toString()}` : '';

    const indicatorsData = await this.get(`indicators${queryString}`);
    const byIndicatorSlug = {};
    indicatorsData.forEach((x: any) => {
      byIndicatorSlug[x.slug] = x.indicator_values.map((iv) => ({ ...iv, indicator: x.slug }));
    });
    return byIndicatorSlug;
  }

  getSingleIndicator({ slug, ...restArgs }: GetSingleIndicatorArgs): Promise<IndicatorValue[]> {
    return this.getIndicators({ slug, ...restArgs }).then((data: any) => data[slug] || []);
  }

  async getIndicatorValues(params: GetIndicatorsArgs): Promise<IndicatorValue[]> {
    const indicators = await this.getIndicators(params);
    return Object.keys(indicators).reduce((acc, slug) => [...acc, ...indicators[slug]], []);
  }

  get(endpoint: string): Promise<any> {
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
