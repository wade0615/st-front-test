import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitState {
  selectedValue: string | null;
}

const initialState: InitState = {
  selectedValue: null
};

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setSelectedValue: (state, action: PayloadAction<string | null>) => {
      state.selectedValue = action.payload;
    }
  }
});

export const { setSelectedValue } = initSlice.actions;
export type { InitState };
export default initSlice.reducer;
