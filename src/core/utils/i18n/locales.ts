type AppStrings = {
  headers: {
    home: string;
    addPost: string;
    post: string;
  };
};

export enum AppLanguages {
  EN,
  RU,
}

export const locales: Record<AppLanguages, AppStrings> = {
  [AppLanguages.EN]: {
    headers: {
      home: "Home",
      addPost: "Add post",
      post: "Post",
    },
  },
  [AppLanguages.RU]: {
    headers: {
      home: "Главная",
      addPost: "Добавить запись",
      post: "Запись",
    },
  },
};
