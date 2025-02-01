import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LSService } from '~/shared/lib/local-storage.service';
import type { User } from './user.schema';
import { type UsersState, usersStateSchema } from './users-state.schema';

const SLICE_NAME = 'users';

type UserProps = Exclude<keyof User, 'id'>;

type UpdateUserPayload = { [K in UserProps]: { id: User['id']; prop: K; value: User[K] } }[UserProps];

const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState: () => usersStateSchema.catch([{ id: '0', name: '', cw: '' }]).parse(LSService.get(SLICE_NAME)),
  reducers: {
    addUser(state) {
      state.push({ id: state.length.toString(), name: '', cw: '' });
    },
    removeUser(state) {
      state.pop();
    },
    updateUser(state, { payload }: PayloadAction<UpdateUserPayload>) {
      const { id, prop, value } = payload;
      const user = state[Number(id)];

      if (user === undefined) {
        throw new Error('no user found');
      }

      user[prop] = value;
    },
  },
});

export const { addUser, removeUser, updateUser } = usersSlice.actions;

export function persistUsersState(getState: () => UsersState) {
  window.addEventListener('beforeunload', () => {
    LSService.set(SLICE_NAME, getState());
  });
}

export const usersReducer = { [usersSlice.reducerPath]: usersSlice.reducer };
