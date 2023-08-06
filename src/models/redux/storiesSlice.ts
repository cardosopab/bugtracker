import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Story from '../Story';

export const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    value: [] as Story[],
  },
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setStories } = storiesSlice.actions;

export default storiesSlice.reducer;
