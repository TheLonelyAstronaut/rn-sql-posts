type AppTheme = {
  background: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  button: {
    primary: string;
    secondary: string;
    disabled: string;
    danger: string;
    radius: number;
  };
  input: {
    radius: number;
  };
  padding: number;
};

export enum AppThemes {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export const themes: Record<AppThemes, AppTheme> = {
  [AppThemes.LIGHT]: {
    background: {
      secondary: "#f8f9fa",
      primary: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#bdc3c7",
    },
    button: {
      primary: "#ecf0f1",
      secondary: "#fff",
      disabled: "#ecf0f1",
      danger: "#ff0000",
      radius: 8,
    },
    input: {
      radius: 8,
    },
    padding: 8,
  },
  [AppThemes.DARK]: {
    background: {
      secondary: "#212529",
      primary: "#000",
    },
    text: {
      primary: "#fff",
      secondary: "#adb5bd",
    },
    button: {
      primary: "#495057",
      secondary: "#adb5bd",
      disabled: "#343a40",
      radius: 8,
      danger: "#ff0000",
    },
    input: {
      radius: 8,
    },
    padding: 8,
  },
};
