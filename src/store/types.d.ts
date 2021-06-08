declare namespace Store {
  type AppState = {
    language: 'zh-CN' | 'en-US';
  };

  type UserState = {
    token: string;
    currentUser: {
      username: string;
    } | null;
  };

  type RootState = AppState & UserState;
}
