export function getFormattedDate(dateOrMs: Date | number) {
  return (typeof dateOrMs === 'object' ? dateOrMs : new Date(dateOrMs)).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateDateTime(date: Date) {
  return new Date(getFormattedDate(date));
}

export function getDateByDayDiff(ms: number, days: number, rtype: 'number'): number;
export function getDateByDayDiff(ms: number, days: number, rtype?: 'string'): string;
export function getDateByDayDiff(ms: number, days: number, rtype: 'number' | 'string' = 'string') {
  const result = ms + daysToMs(days);

  return rtype === 'number' ? result : getFormattedDate(result);
}

export function compareDates(date1: Date, date2: Date) {
  let result = date1.getFullYear() - date2.getFullYear();

  if (!result) {
    result = date1.getMonth() - date2.getMonth();
  }

  if (!result) {
    result = date1.getDate() - date2.getDate();
  }

  return result;
}

export function msToDays(ms: number) {
  return Math.ceil(ms / 1000 / 60 / 60 / 24);
}

export function daysToMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

export function numberWithSpaces(n?: number) {
  return n !== undefined ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
}
