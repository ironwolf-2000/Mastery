import { ILanguage } from './i18n/config';

export function getFormattedDate(lang: ILanguage, dateOrMs: Date | number) {
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
  return (typeof dateOrMs === 'object' ? dateOrMs : new Date(dateOrMs)).toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateDateTime(lang: ILanguage, date: Date) {
  return new Date(getFormattedDate(lang, date));
}

export function getDateByDayDiff(
  lang: ILanguage,
  ms: number,
  days: number,
  rtype: 'number'
): number;
export function getDateByDayDiff(
  lang: ILanguage,
  ms: number,
  days: number,
  rtype?: 'string'
): string;
export function getDateByDayDiff(
  lang: ILanguage,
  ms: number,
  days: number,
  rtype: 'number' | 'string' = 'string'
) {
  const result = ms + daysToMs(days);

  return rtype === 'number' ? result : getFormattedDate(lang, result);
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

export function toTwoDecimalPlaces(n: number) {
  return Number(n.toFixed(2));
}

export function typeNumber(
  e: React.ChangeEvent<HTMLInputElement>,
  maxDigits: number,
  cb: (v: string) => void
) {
  const val = e.target.value;
  if ((val && !/^\d+$/.test(val)) || val.length > maxDigits) {
    return;
  }

  cb(val);
}

export function nextRandomInt(min: number, max: number, curr: number) {
  let res = curr;

  while (res === curr) {
    res = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return res;
}
