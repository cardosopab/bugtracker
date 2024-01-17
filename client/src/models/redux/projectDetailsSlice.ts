import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Project from "../Project";

export const projectDetailsSlice = createSlice({
  name: "projectDetails",
  initialState: {
    value: {} as Project,
  },
  reducers: {
    setProjectDetails: (state, action: PayloadAction<Project>) => {
      state.value = action.payload;
    },
  },
});

export const { setProjectDetails } = projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
