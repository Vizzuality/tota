export const monthNameFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
export const shortMonthName = (date: string) => monthNameFormatter.format(new Date(date));
export const formatPercentage = (value: number) =>
  value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
export const compactNumberTickFormatter = (value) =>
  new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(value);
export const moneyTickFormatter = (value) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const compactMoneyTickFormatter = (value) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);

export const previousYear = (new Date().getFullYear() - 1).toString();
export const thisYear = new Date().getFullYear().toString();
