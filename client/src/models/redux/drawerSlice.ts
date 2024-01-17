import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  index: number;
}

const initialState: DrawerState = {
  index: 0,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setDrawerIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const { setDrawerIndex } = drawerSlice.actions;
export default drawerSlice.reducer;
