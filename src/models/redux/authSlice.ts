import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    authInitialized: boolean;
    authStatus: boolean;
    currentUser: string;
}

const initialState: AuthState = {
    authInitialized: false,
    authStatus: false,
    currentUser: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthInitialized: (state, action: PayloadAction<boolean>) => {
            state.authInitialized = action.payload;
        },
        setAuthStatus: (state, action: PayloadAction<boolean>) => {
            state.authStatus = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<string>) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setAuthInitialized, setAuthStatus, setCurrentUser } = authSlice.actions;

// export const initAuth = () => (dispatch: any) => {
//     // Watch for auth state changes
//     auth.onAuthStateChanged((user) => {
//         dispatch(setAuthInitialized(true));
//         dispatch(setCurrentUser(user?.uid ?? ''));
//     });
// };

export default authSlice.reducer;
