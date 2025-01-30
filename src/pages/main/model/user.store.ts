import { create } from 'zustand';

type User = Record<'id' | 'name' | 'cw' | 'kata', string>;

type State = {
  users: User[];
  addUser: () => void;
  removeUser: () => void;
  updateUser: <K extends keyof User>(id: User['id'], prop: K, value: User[K]) => void;
};

export const useUserStore = create<State>()((set) => ({
  users: [],
  addUser: () => {
    set((state) => ({ users: state.users.concat({ id: state.users.length.toString(), name: '', cw: '', kata: '' }) }));
  },
  removeUser: () => {
    set((state) => ({ users: state.users.slice(0, -1) }));
  },
  updateUser: <K extends keyof User>(id: User['id'], prop: K, value: User[K]) => {
    set((state) => {
      const idx = Number(id);
      const user = state.users[idx];

      if (user === undefined) {
        throw new Error('no user found');
      }

      return { users: state.users.with(idx, { ...user, [prop]: value }) };
    });
  },
}));
