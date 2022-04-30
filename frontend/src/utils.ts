export function getFormattedDate(dateOrMs: Date | number) {
  return (typeof dateOrMs === 'object' ? dateOrMs : new Date(dateOrMs)).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDateByDayDiff(ms: number, days: number, rtype: 'number'): number;
export function getDateByDayDiff(ms: number, days: number, rtype?: 'string'): string;
export function getDateByDayDiff(ms: number, days: number, rtype: 'number' | 'string' = 'string') {
  const result = ms + daysToMs(days);

  return rtype === 'number' ? result : getFormattedDate(result);
}

export function msToDays(ms: number) {
  return Math.ceil(ms / 1000 / 60 / 60 / 24);
}

export function daysToMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}
