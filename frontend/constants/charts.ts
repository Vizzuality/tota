export const bottomLegend = {
  iconType: 'square',
  layout: 'horizontal',
  verticalAlign: 'bottom',
  align: 'left',
  wrapperStyle: {
    color: '#314057',
    fontSize: 14,
  },
};

export const defaultGrid = {
  height: '1px',
  strokeDasharray: '0',
  stroke: '#E9EBF1',
};

export const defaultTooltip = { cursor: { stroke: '#314057', strokeWidth: 1 } };

export const COLORS = [
  '#CCEFEA',
  '#6FD0C3',
  '#1CB5A1',
  '#1B887C',
  '#185F5A',
  '#B4D0E9',
  '#84B1DA',
  '#5292CB',
  '#3169B1',
  '#0D3C96',
  '#CEAF9D',
  '#BA9077',
  '#AA6B5B',
  '#933633',
  '#000000',
  '#9CA3AE',
];

export const getColorPalette = (dataLength: number) => {
  if (dataLength <= 2) {
    return ['#00B6A1', '#115E59'];
  }

  if (dataLength <= 4) {
    return ['#00B6A1', '#01796F', '#57A0D3', '#0F52BA'];
  }

  if (dataLength <= 8) {
    return ['#00B6A1', '#008C60', '#115E59', '#57A0D3', '#3974A1', '#063898', '#9CA3AF', '#4B5563'];
  }

  return COLORS;
};
