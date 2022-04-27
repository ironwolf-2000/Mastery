export function getFormattedDate(dateOrMs: Date | number) {
  return (typeof dateOrMs === 'object' ? dateOrMs : new Date(dateOrMs)).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDateByDayDiff(ms: number, days: number) {
  return getFormattedDate(ms + 24 * 60 * 60 * 1000 * days);
}
