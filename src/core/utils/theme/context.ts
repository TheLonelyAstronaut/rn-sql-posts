import React, { useContext } from "react";
import { AppThemes, themes } from "./themes";

const ThemeContext = React.createContext({
  currentTheme: AppThemes.LIGHT,
});

export const useTheme = () => {
  const { currentTheme } = useContext(ThemeContext);

  return {
    currentTheme,
    themes,
  };
};

export const ThemeProvider = ThemeContext.Provider;
