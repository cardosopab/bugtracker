import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../User";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    value: [] as User[],
  },
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
