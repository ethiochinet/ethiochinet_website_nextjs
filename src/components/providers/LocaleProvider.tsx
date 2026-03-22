'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Locale = 'en' | 'am' | 'om';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  translations: any;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Import translations
import enTranslations from '@/messages/en/index.json';
import amTranslations from '@/messages/am/index.json';
import omTranslations from '@/messages/om/index.json';

const translationsMap = {
  en: enTranslations,
  am: amTranslations,
  om: omTranslations,
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState<any>(translationsMap.en);
  const router = useRouter();

  useEffect(() => {
    // Load saved locale from localStorage
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
    
    // Refresh the page to update all content
    router.refresh();
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
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