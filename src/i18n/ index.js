// lib/i18n/index.ts
import enTranslations from './locales/en/common.json';
import amTranslations from './locales/am/common.json';
import omTranslations from './locales/om/common.json';
import tiTranslations from './locales/ti/common.json';
import soTranslations from './locales/so/common.json';

export type Language = 'en' | 'am' | 'om' | 'ti' | 'so';

export interface Translations {
  [key: string]: {
    [key: string]: any;
  };
}

export const translations: Translations = {
  en: enTranslations,
  am: amTranslations,
  om: omTranslations,
  ti: tiTranslations,
  so: soTranslations,
};

export const languageNames = {
  en: { native: 'English', english: 'English', flag: '🇬🇧' },
  am: { native: 'አማርኛ', english: 'Amharic', flag: '🇪🇹' },
  om: { native: 'Afaan Oromoo', english: 'Afan Oromo', flag: '🇪🇹' },
  ti: { native: 'ትግርኛ', english: 'Tigrinya', flag: '🇪🇷' },
  so: { native: 'Soomaali', english: 'Somali', flag: '🇸🇴' },
};

export const defaultLanguage: Language = 'en';

export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}