import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import LSService from '~/shared/lib/local-storage.service';
import katasStateSchema, { type KatasState } from './katas-state.schema';

const SLICE_NAME = 'katas';

const katasSlice = createSlice({
  name: SLICE_NAME,
  initialState: () =>
    katasStateSchema.catch({ rawForbiddenKatas: '', rawSuggestedKatas: '' }).parse(LSService.get(SLICE_NAME)),
  reducers: {
    updateForbiddenKatas(state, { payload }: PayloadAction<string>) {
      state.rawForbiddenKatas = payload;
    },
    updateSuggestedKatas(state, { payload }: PayloadAction<string>) {
      state.rawSuggestedKatas = payload;
    },
  },
});

export const { updateForbiddenKatas, updateSuggestedKatas } = katasSlice.actions;

export function persistKatasState(getState: () => KatasState) {
  window.addEventListener('beforeunload', () => {
    LSService.set(SLICE_NAME, getState());
  });
}

export default { [katasSlice.reducerPath]: katasSlice.reducer };
