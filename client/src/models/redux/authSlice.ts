import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../User";

interface AuthState {
  authInitialized: boolean;
  authStatus: boolean;
  currentUser: User | null;
}

const initialState: AuthState = {
  authInitialized: false,
  authStatus: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInitialized: (state, action: PayloadAction<boolean>) => {
      state.authInitialized = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.authStatus = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setAuthInitialized, setAuthStatus, setCurrentUser } =
  authSlice.actions;
export default authSlice.reducer;
