import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    authInitialized: boolean;
    authStatus: boolean;
    currentUserId: string;
}

const initialState: AuthState = {
    authInitialized: false,
    authStatus: false,
    currentUserId: '',
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
        setCurrentUserId: (state, action: PayloadAction<string>) => {
            state.currentUserId = action.payload;
        },
    },
});

export const { setAuthInitialized, setAuthStatus, setCurrentUserId } = authSlice.actions;

// export const initAuth = () => (dispatch: any) => {
//     // Watch for auth state changes
//     auth.onAuthStateChanged((user) => {
//         dispatch(setAuthInitialized(true));
//         dispatch(setCurrentUserId(user?.uid ?? ''));
//     });
// };

export default authSlice.reducer;
