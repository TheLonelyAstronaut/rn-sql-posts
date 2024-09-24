import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { AppLanguages, locales } from "./locales";
import { useKvStorageState } from "../storage";

const I18nContext = React.createContext({
  currentLocale: AppLanguages.EN,
  setLocale: (_: AppLanguages) => {},
});

export const useLocale = () => {
  const { currentLocale, setLocale } = useContext(I18nContext);

  const changeLocale = useCallback(() => {
    if (currentLocale === AppLanguages.EN) setLocale(AppLanguages.RU);
    else setLocale(AppLanguages.EN);
  }, [currentLocale]);

  return {
    currentLocale,
    locales: locales,
    changeLocale,
  };
};

export const I18nProvider = (props: PropsWithChildren) => {
  const [[isLoading, currentLocale], setLocale] = useKvStorageState("i18n");

  return (
    <I18nContext.Provider
      value={{
        currentLocale: (currentLocale as AppLanguages) ?? AppLanguages.EN,
        setLocale,
      }}
    >
      {props.children}
    </I18nContext.Provider>
  );
};
