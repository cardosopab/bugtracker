import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../database/firebase-config';
import { User } from 'firebase/auth';


interface AuthState {
    authInitialized: boolean;
    currentUser: User | null;
}

const initialState: AuthState = {
    authInitialized: false,
    currentUser: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthInitialized: (state, action: PayloadAction<boolean>) => {
            state.authInitialized = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setAuthInitialized, setCurrentUser } = authSlice.actions;

export const initAuth = () => (dispatch: any) => {
    // Watch for auth state changes
    auth.onAuthStateChanged((user) => {
        dispatch(setAuthInitialized(true));
        dispatch(setCurrentUser(user));
    });
};

export default authSlice.reducer;
