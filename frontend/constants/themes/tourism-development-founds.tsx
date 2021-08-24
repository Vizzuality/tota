import uniq from 'lodash/uniq';
import type { ThemeType, IndicatorValue } from 'types';
import { getOptions } from 'utils/charts';

import mountains2Image from 'images/home/image-mountains2.png';

// TODO: That will be removed when I clean up mess with regions and connect with API
const regionsMap = {
  thompson_okanagan: 'Thompson Okanagan',
  british_columbia: 'British Columbia',
  cariboo_chilcotin_coast: 'Cariboo Chilcotin Coast',
  northern_british_columbia: 'Northern BC',
  vancouver_island: 'Vancouver Island',
  kootenay_rockies: 'Kootenay Rockies'
}

const theme: ThemeType = {
  title: 'Tourism Development Funds',
  slug: 'tourism-development-funds',
  image: mountains2Image,
  sections: [{
    title: 'Volume and projects by region',
    description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Sed sodales aliquam nisl eget mollis. Quisque mollis nisi felis, eu convallis purus sagittis sit amet. Sed elementum scelerisque ipsum, at rhoncus eros venenatis at. Donec mattis quis massa ut viverra. In ullamcorper, magna non convallis ultricies. `,
    initialState: {
      year: '2020',
    },
    fetchParams: (state: any) => ({
      slug: ['development_funds_by_source', 'development_funds_volume_by_source'],
      region: [state.selectedRegion.name, ...state.selectedRegion.children?.map((x) => x.name)].filter((x) => x),
    }),
    widget: {
      type: 'map',
      fetchProps(rawData: IndicatorValue[] = [], state: any): any {
        const fundSources = uniq(rawData.map(x => x.category_1)).filter(x => x);
        const selectedRegion = state.selectedRegion.name === 'British Columbia'
          ? null
          : Object.keys(regionsMap).find(key => regionsMap[key] === state.selectedRegion.name);

        return {
          data: 'Data placeholder',
          controls: [{ type: 'select', side: 'right', name: 'year', options: getOptions(['2019', '2020', '2021']) }],
          selectedRegion,
          featureTooltip: (feature: any) => {
            const regionName = regionsMap[feature.properties.TOURISM_REGION_NAME];
            const regionData = rawData.filter(x => x.region === regionName);
            const volumes = regionData.filter(x => x.indicator === 'development_funds_volume_by_source');
            const counts = regionData.filter(x => x.indicator === 'development_funds_by_source');

            return (
              <>
                <div className="bg-blue9 py-2 px-4 text-white flex flex-row justify-between">
                  <div>{state.year}</div>
                </div>
                <div className="px-4 py-2 text-blue9">
                  <div className="font-bold">{regionName} Projects</div>
                  {fundSources.map((source, index) => (
                    <div key={index} className="flex justify-between">
                      <div>{source}</div>
                      <div className="font-bold text-right">
                        {counts.find(x => x.category_1 === source)?.value || 0} <br />
                        {volumes.find(x => x.category_1 === source)?.value || 0} $
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          }
        };
      },
    },
  },],
};

export default theme;
