import React, { PropsWithChildren, useCallback, useContext } from "react";
import { AppThemes, themes } from "./themes";
import { useKvStorageState } from "../storage";
import { StatusBar } from "expo-status-bar";

const ThemeContext = React.createContext({
  currentTheme: AppThemes.LIGHT,
  setTheme: (_: AppThemes) => {},
});

export const useTheme = () => {
  const { currentTheme, setTheme } = useContext(ThemeContext);

  const changeTheme = useCallback(() => {
    if (currentTheme === AppThemes.DARK) setTheme(AppThemes.LIGHT);
    else setTheme(AppThemes.DARK);
  }, [currentTheme]);

  return {
    currentTheme,
    themes,
    changeTheme,
  };
};

export const ThemeProvider = (props: PropsWithChildren) => {
  const [[isLoading, currentTheme], setTheme] = useKvStorageState("theme");

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: (currentTheme as AppThemes) ?? AppThemes.LIGHT,
        setTheme,
      }}
    >
      <StatusBar
        animated
        style={currentTheme === AppThemes.DARK ? "light" : "dark"}
      />
      {props.children}
    </ThemeContext.Provider>
  );
};
