import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './src/locales/en.json';
import mar from './src/locales/mar.json';
import or from './src/locales/or.json';
import pnj from './src/locales/pnj.json';
import hin from './src/locales/hin.json';
import beng from './src/locales/beng.json';

const LANGUAGES = {
  en: {translation: en},
  mar: {translation: mar},
  or: {translation: or},
  pnj: {translation: pnj},
  hin: {translation: hin},
  beng: {translation: beng},
};

export const languageOptions = [
  {code: 'en', label: 'English'},
  {code: 'hin', label: 'Hindi'},
  {code: 'mar', label: 'Marathi'},
  {code: 'or', label: 'Odia'},
  {code: 'pnj', label: 'Punjabi'},
  {code: 'beng', label: 'Bengali'},
];

const LANG_CODES = Object.keys(LANGUAGES);

let cachedLanguage = null;

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    if (cachedLanguage) {
      callback(cachedLanguage);
      return;
    }
    try {
      const language = await AsyncStorage.getItem('user-language');
      if (language) {
        cachedLanguage = language;
        callback(language);
      } else {
        const bestLanguage = RNLocalize.findBestLanguageTag(LANG_CODES);
        callback(bestLanguage?.languageTag || 'en');
      }
    } catch (error) {
      const bestLanguage = RNLocalize.findBestLanguageTag(LANG_CODES);
      callback(bestLanguage?.languageTag || 'en');
    }
  },
  init: () => {},
  cacheUserLanguage: language => {
    cachedLanguage = language;
    AsyncStorage.setItem('user-language', language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    fallbackLng: 'en',
    defaultNS: 'translation',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: true, // Enable logging during development
  });

export default i18n;
