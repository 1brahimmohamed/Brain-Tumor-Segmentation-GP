import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStoreAuthSlice } from '@models/store';

const initialState: IStoreAuthSlice = {
    userInfo: null,
    token: null,
    hasAutoLoginFinished: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthInfo: (
            state,
            action: PayloadAction<{
                userInfo: IStoreAuthSlice['userInfo'];
                token: IStoreAuthSlice['token'];
            }>
        ) => {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
        },
        resetAuthInfo: (state) => {
            state.userInfo = null;
            state.token = null;
        },
        setAutoLoginFinished: (state) => {
            state.hasAutoLoginFinished = true;
        }
    }
});

export const authSliceActions = authSlice.actions;

export default authSlice;
