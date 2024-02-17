import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Company from "../Company";

export const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    value: [] as Company[],
  },
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCompanies } = companiesSlice.actions;

export default companiesSlice.reducer;
