import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '@/locales/translations';

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('denizli-taksi-lang') || 'tr');

  useEffect(() => {
    localStorage.setItem('denizli-taksi-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (!result) {
        console.warn(`Translation not found for key: ${key} in language: ${language}`);
        const fallbackResult = translations['tr']; 
        let fallbackText = fallbackResult;
        for (const fk of keys) {
          fallbackText = fallbackText?.[fk];
          if(!fallbackText) return key;
        }
        return fallbackText || key;
      }
    }
    return result;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};