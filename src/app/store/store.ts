import { configureStore } from '@reduxjs/toolkit';
import { katasReducer, persistKatasState } from '~/entities/kata';
import { persistUsersState, usersReducer } from '~/entities/user';
import { codewarsKatasApiMiddleware, codewarsKatasApiReducer } from '~/features/codewars/get-katas';
import { codewarsUsersApiMiddleware, codewarsUsersApiReducer } from '~/features/codewars/get-user-katas';

export const store = configureStore({
  reducer: {
    ...usersReducer,
    ...katasReducer,
    ...codewarsUsersApiReducer,
    ...codewarsKatasApiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(codewarsUsersApiMiddleware, codewarsKatasApiMiddleware),
});

persistUsersState(() => store.getState().users);
persistKatasState(() => store.getState().katas);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
