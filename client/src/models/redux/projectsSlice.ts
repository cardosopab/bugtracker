import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Project from "../Project";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    value: [] as Project[],
    paginatedProjects: [] as Project[],
    page: 0 as number,
    totalPages: 0 as number,
  },
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.value = action.payload;
    },
    setPaginatedProjects: (
      state,
      action: PayloadAction<{
        paginatedProjects: Project[];
        page: number;
        totalPages: number;
      }>
    ) => {
      state.paginatedProjects = action.payload.paginatedProjects;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setProjects, setPaginatedProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
