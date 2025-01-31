import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import LSService from '~/shared/lib/local-storage.service';
import type { User } from './user.schema';
import type { UsersState } from './users-state.schema';
import usersStateSchema from './users-state.schema';

const STORAGE_KEY = 'users';

function initialState(): UsersState {
  try {
    return usersStateSchema.parse(LSService.get(STORAGE_KEY));
  } catch {
    return [{ id: '0', name: '', cw: '', kata: '' }];
  }
}

type UserProps = Exclude<keyof User, 'id'>;

type UpdateUserPayload = { [K in UserProps]: { id: User['id']; prop: K; value: User[K] } }[UserProps];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state) {
      state.push({ id: state.length.toString(), name: '', cw: '', kata: '' });
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
    LSService.set(STORAGE_KEY, getState());
  });
}

export default { [usersSlice.reducerPath]: usersSlice.reducer };
