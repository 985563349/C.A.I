import { Module } from 'vuex';

const app: Module<Store.AppState, Store.RootState> = {
  namespaced: true,

  state: {
    language: 'zh-CN',
  },

  mutations: {
    SET_LANGUAGE(state, payload) {
      state.language = payload;
    },
  },
};

export default app;
