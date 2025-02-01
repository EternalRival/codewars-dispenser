import { configureStore } from '@reduxjs/toolkit';
import { katasReducer, persistKatasState } from '~/entities/kata';
import { persistUsersState, usersReducer } from '~/entities/user';

export const store = configureStore({
  reducer: {
    ...usersReducer,
    ...katasReducer,
  },
});

persistUsersState(() => store.getState().users);
persistKatasState(() => store.getState().katas);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
