type AppStrings = {
  headers: {
    home: string;
    addPost: string;
    post: string;
    signIn: string;
    settings: string;
  };
  buttons: {
    signIn: string;
    signOut: string;
    changeTheme: string;
    changeLanguage: string;
    send: string;
    enterText: string;
  };
  inputs: {
    email: string;
    username: string;
    password: string;
  };
};

export enum AppLanguages {
  EN = "EN",
  RU = "RU",
}

export const locales: Record<AppLanguages, AppStrings> = {
  [AppLanguages.EN]: {
    headers: {
      home: "Home",
      addPost: "Add post",
      post: "Post",
      signIn: "Welcome to Posts",
      settings: "Settings",
    },
    buttons: {
      signIn: "Sign in",
      signOut: "Sign out",
      changeTheme: "Change theme",
      changeLanguage: "Change language",
      send: "Send",
      enterText: "Enter text...",
    },
    inputs: {
      email: "Email",
      username: "User name",
      password: "Password",
    },
  },
  [AppLanguages.RU]: {
    headers: {
      home: "Главная",
      addPost: "Добавить запись",
      post: "Запись",
      signIn: "Добро пожаловать",
      settings: "Настройки",
    },
    buttons: {
      signIn: "Войти",
      signOut: "Выйти",
      changeTheme: "Сменить тему",
      changeLanguage: "Сменить язык",
      send: "Отправить",
      enterText: "Введите текст...",
    },
    inputs: {
      email: "Электронная почта",
      username: "Имя пользователя",
      password: "Пароль",
    },
  },
};
