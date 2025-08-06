
import React, { useState, useContext, createContext } from 'react';

type Language = 'en' | 'lt';

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'lt' : 'en'));
  }
  const value = {language,setLanguage,toggleLanguage};

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}