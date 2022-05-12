import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const LANGUAGES = ['en', 'ru'] as const;
export const DEFAULT_LANGUAGE = 'en';

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  resources: {
    en: {
      translations: require('./locales/en/translations.json'),
    },
    ru: {
      translations: require('./locales/ru/translations.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = LANGUAGES;

export type ILanguage = typeof LANGUAGES[number];
export type ILanguageName = 'English' | 'Русский';

export default i18n;
