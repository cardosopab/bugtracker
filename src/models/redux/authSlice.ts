import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    authInitialized: boolean;
    authStatus: boolean;
    currentUserId: string;
    companyId: string;
}

const initialState: AuthState = {
    authInitialized: false,
    authStatus: false,
    currentUserId: '',
    companyId: '',
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
        setCompanyId: (state, action: PayloadAction<string>) => {
            state.companyId = action.payload;
        },
    },
});

export const { setAuthInitialized, setAuthStatus, setCurrentUserId, setCompanyId } = authSlice.actions;
export default authSlice.reducer;

