import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStoreUISlice, INotification } from '@/models';

const initialState: IStoreUISlice = {
    notification: null,
    notifications: [],
    isLoading: false,
    themeMode: 'dark',
    isDisplayingDicomStudies: true,
    currentLanguage: 'EN'
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<Omit<INotification, 'id'>>) {
            state.notification = {
                ...action.payload,
                id: new Date().toISOString()
            };
            state.notifications.push(state.notification);
        },
        clearNotification(state) {
            state.notification = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        toggleTheme(state) {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
        },
        toggleDisplayedStudiesTable(state) {
            state.isDisplayingDicomStudies = !state.isDisplayingDicomStudies;
        },
        setCurrentLanguage(state, action: PayloadAction<string>) {
            state.currentLanguage = action.payload;
        }
    }
});

export const uiSliceActions = uiSlice.actions;

export default uiSlice;
