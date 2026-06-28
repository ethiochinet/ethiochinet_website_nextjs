'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Locale = 'en' | 'am' | 'om' | 'tg' | 'so';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  translations: any;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

import enTranslations from '@/messages/en/index.json';
import amTranslations from '@/messages/am/index.json';
import omTranslations from '@/messages/om/index.json';
import tgTranslations from '@/messages/tg/index.json';
import soTranslations from '@/messages/so/index.json';

const translationsMap = {
  en: enTranslations,
  am: amTranslations,
  om: omTranslations,
  tg: tgTranslations,
  so: soTranslations,
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState<any>(translationsMap.en);
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && translationsMap[savedLocale]) {
      setLocale(savedLocale);
      setTranslations(translationsMap[savedLocale]);
      document.documentElement.lang = savedLocale;
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setTranslations(translationsMap[newLocale]);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
    router.refresh();
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fall back to English
        let fallback: any = enTranslations;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t, translations }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
