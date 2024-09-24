type AppTheme = {
  background: string;
  text: {
    primary: string;
    secondary: string;
  };
  padding: number;
};

export enum AppThemes {
  LIGHT,
  DARK,
}

export const themes: Record<AppThemes, AppTheme> = {
  [AppThemes.LIGHT]: {
    background: "#fff",
    text: {
      primary: "#000",
      secondary: "#555",
    },
    padding: 8,
  },
  [AppThemes.DARK]: {
    background: "#000",
    text: {
      primary: "#fff",
      secondary: "#555",
    },
    padding: 8,
  },
};
