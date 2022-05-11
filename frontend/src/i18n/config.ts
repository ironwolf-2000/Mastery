import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  fallbackLng: 'ru',
  lng: 'ru',
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

i18n.languages = ['en', 'ru'];

export default i18n;
