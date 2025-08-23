import React, { useState, useContext, createContext } from "react";

type Language = "en" | "lt";

interface LanguageContextType {
  language: Language;
  isLanguageButtonActive: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setLanguageButtonActive: (active: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isLanguageButtonActive, setLanguageButtonActive] =
    useState<boolean>(false);

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === "en" ? "lt" : "en"));
    setLanguageButtonActive(true);
  }

  const value = {
    language,
    isLanguageButtonActive,
    setLanguage,
    toggleLanguage,
    setLanguageButtonActive,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
