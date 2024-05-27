import { configureStore } from '@reduxjs/toolkit';
import uiSlice from '@ui/ui-slice.ts';
import authSlice from '@features/authentication/auth-slice.ts';
import studiesSlice from '@features/studies-table/studies-slice.ts';
import viewerSlice from '@features/viewer/viewer-slice.ts';
const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        studies: studiesSlice.reducer,
        viewer: viewerSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type TAppDispatch = typeof store.dispatch;

export default store;
