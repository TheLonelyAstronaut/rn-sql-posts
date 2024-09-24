import React, { useContext } from "react";
import { AppLanguages, locales } from "./locales";

const I18nContext = React.createContext({
  currentLocale: AppLanguages.EN,
});

export const useLocale = () => {
  const { currentLocale } = useContext(I18nContext);

  return {
    currentLocale,
    locales: locales,
  };
};

export const I18nProvider = I18nContext.Provider;
