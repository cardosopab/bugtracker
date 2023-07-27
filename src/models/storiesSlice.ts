import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Story {
  message: string;
}

export const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    value: [] as Story[],
  },
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const newStory: Story = { message: action.payload };
      state.value.push(newStory);
    },
  },
});

export const { add } = storiesSlice.actions;

export default storiesSlice.reducer;
