import { parseISO } from 'date-fns';

export const monthNameFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
export const shortMonthName = (date: string) => {
  const d = parseISO(date);
  return monthNameFormatter.format(d);
};
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

export const previousYear = (new Date().getFullYear() - 1).toString();
export const thisYear = new Date().getFullYear().toString();
