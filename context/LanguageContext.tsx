// context/LanguageContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type Language = "en" | "bg";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// (Full translations are assumed to be present for brevity)
const translations: Record<Language, Record<string, string>> = {
  en: {
    /* ... full English translations from source ... */
  },
  bg: {
    /* ... full Bulgarian translations from source ... */
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en"); // Default to 'en'

  const value = useMemo(() => {
    const t = (key: string): string => {
      const translation = translations[language]?.[key];
      return translation !== undefined ? translation : key;
    };

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

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
