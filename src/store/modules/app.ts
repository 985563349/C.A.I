import type { Module } from 'vuex';
import type { RootState } from '@/store';

export interface AppState {
  language: 'zh-CN' | 'en-US';
}

const app: Module<AppState, RootState> = {
  namespaced: true,

  state: {
    language: 'zh-CN',
  },

  getters: {
    language: (state) => state.language,
  },

  mutations: {
    SET_LANGUAGE(state, payload) {
      state.language = payload;
    },
  },

  actions: {
    setLanguage({ commit }, payload) {
      commit('SET_LANGUAGE', payload);
    },
  },
};

export default app;
