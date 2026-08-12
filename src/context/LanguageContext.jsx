import React, { createContext, useContext, useState } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

const interpolate = (str, params) =>
  params ? str.replace(/\{\{(\w+)\}\}/g, (_, k) => (params[k] ?? `{{${k}}}`)) : str;

export const LanguageProvider = ({ children }) => {
  const [langCode, setLangCodeState] = useState(
    () => localStorage.getItem('lang') || (navigator.language || 'en').slice(0, 2)
  );

  const setLangCode = (code) => {
    setLangCodeState(code);
    localStorage.setItem('lang', code);
  };

  const t = (path, params) => {
    if (!path) return '';
    const keys = path.split('.');
    let current = translations[langCode] || translations['en'];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) fallback = fallback[fk];
        }
        return typeof fallback === 'string' ? interpolate(fallback, params) : path;
      }
    }
    return typeof current === 'string' ? interpolate(current, params) : path;
  };

  return (
    <LanguageContext.Provider value={{ langCode, setLangCode, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);