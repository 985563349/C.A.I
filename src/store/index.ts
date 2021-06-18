import { createStore, useStore as baseUseStore, Store } from 'vuex';
import type { InjectionKey } from '@vue/runtime-core';

import app from '@/store/modules/app';
import type { AppState } from '@/store/modules/app';
import user from '@/store/modules/user';
import type { UserState } from '@/store/modules/user';

export type RootState = AppState & UserState;

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  strict: true,
  modules: { app, user },
});

export function useStore() {
  return baseUseStore(key);
}
