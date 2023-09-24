import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Project from "../Project";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    value: [] as Project[],
  },
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
