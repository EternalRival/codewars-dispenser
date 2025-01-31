import { configureStore } from '@reduxjs/toolkit';
import { persistUsersState, usersReducer } from '~/entities/user';

export const store = configureStore({
  reducer: {
    ...usersReducer,
  },
});

persistUsersState(() => store.getState().users);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
