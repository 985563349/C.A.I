import { InjectionKey } from '@vue/runtime-core';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import app from './modules/app';
import user from './modules/user';

export const key: InjectionKey<Store<Store.RootState>> = Symbol();

export const store = createStore<Store.RootState>({
  strict: true,
  modules: { app, user },
});

export function useStore() {
  return baseUseStore(key);
}