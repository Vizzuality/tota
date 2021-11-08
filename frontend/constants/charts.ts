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
  '#00B6A1',
  '#00A572',
  '#008C60',
  '#01796F',
  '#115E59',
  '#134E4A',
  '#57A0D3',
  '#4286BA',
  '#3974A1',
  '#0F52BA',
  '#063898',
  '#00376A',
  '#9CA3AF',
  '#6B7280',
  '#4B5563',
  '#353E4A',
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
