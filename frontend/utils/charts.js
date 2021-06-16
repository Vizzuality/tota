export function mergeRawData({ rawData, mergeBy, labelKey, valueKey }) {
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
