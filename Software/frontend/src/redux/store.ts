import { configureStore } from '@reduxjs/toolkit';
import uiSlice from '@ui/ui-slice.ts';
import authSlice from '@features/authentication/auth-slice.ts';
import studiesSlice from '@features/studies-table/studies-slice.ts';
import viewerSlice from '@features/viewer/viewer-slice.ts';

/**
 * This file is used to configure the Redux store. It imports the reducers from the slices and
 * creates the store with the reducers. The store is exported to be used in the application.
 **/
const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        studies: studiesSlice.reducer,
        viewer: viewerSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});


// Export the store type
export type TAppDispatch = typeof store.dispatch;
export default store;
