import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Project from '../Project';

export const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        value: {} as Project,
    },
    reducers: {
        setDetails: (state, action: PayloadAction<Project>) => {
            state.value = action.payload;
        },
    },
});

export const { setDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
