import { Module } from 'vuex';

const user: Module<Store.UserState, Store.RootState> = {
  namespaced: true,

  state: {
    token: '',
    currentUser: null,
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
