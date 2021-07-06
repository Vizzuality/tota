interface MergeRawData {
  rawData: any[];
  mergeBy: string;
  labelKey: string;
  valueKey: string;
}

export function mergeRawData({ rawData, mergeBy, labelKey, valueKey }: MergeRawData): any[] {
  if (!rawData || !rawData.length) return [];
  const dataObj = {};
  rawData.forEach((rd) => {
    dataObj[rd[mergeBy]] = {
      [mergeBy]: rd[mergeBy],
      ...dataObj[rd[mergeBy]],
      [rd[labelKey]]: rd[valueKey],
    };
  });
  return Object.values(dataObj);
}

export function getAvailableYearsOptions(data: any[]): any[] {
  const yearsOptions = [
    {
      name: 'All years',
      value: 'all_years',
    },
  ];
  const availableYears = Array.from(new Set((data || []).map((d) => new Date(d['date']).getFullYear()))).reverse();
  availableYears.forEach((year) => yearsOptions.push({ name: year.toString(), value: year.toString() }));
  return yearsOptions;
}
