import { configureStore } from '@reduxjs/toolkit';

import uiSlice from '@ui/ui-slice.ts';
import authSlice from '@features/authentication/auth-slice.ts';
import studiesSlice from '@features/studies-table/studies-slice.ts';
import viewportsSlice from '@/features/viewer/Viewport/viewports-slice';

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        studies: studiesSlice.reducer,
        viewports: viewportsSlice.reducer,
    },
});

export type TAppDispatch = typeof store.dispatch;

export default store;
