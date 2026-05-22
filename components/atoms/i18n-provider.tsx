'use client';

import React, { createContext, useContext } from 'react';
import { Dictionary, Locale } from '@/lib/dictionaries/types';

interface I18nContextProps {
  dict: Dictionary;
  lang: Locale;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({
  children,
  dict,
  lang,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <I18nContext.Provider value={{ dict, lang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
