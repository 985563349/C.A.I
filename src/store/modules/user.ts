import type { Module } from 'vuex';
import type { RootState } from '@/store';

export interface UserState {
  token: string;
  currentUser: {
    username: string;
  } | null;
}

const user: Module<UserState, RootState> = {
  namespaced: true,

  state: {
    token: '',
    currentUser: null,
  },

  getters: {
    token: (state) => state.token,

    currentUser: (state) => state.currentUser,
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },

    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },
  },
};

export default user;
