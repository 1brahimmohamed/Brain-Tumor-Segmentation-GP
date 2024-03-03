import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreStudiesSlice } from '@models/store.ts';

const filterStudiesReducers = {
    setDateFilter: (
        state: IStoreStudiesSlice,
        action: PayloadAction<{ startDate: string | null; endDate: string | null }>
    ) => {
        state.startDateFilter = action.payload.startDate;
        state.endDateFilter = action.payload.endDate;

        if (action.payload.startDate === null || action.payload.endDate === null) state.filterPeriod = 'Any';
        else state.filterPeriod = 'Custom';
    },
    setFilterPeriod: (state: IStoreStudiesSlice, action: PayloadAction<string>) => {
        const today = new Date();
        state.filterPeriod = action.payload;

        switch (action.payload) {
            case '1d':
                state.startDateFilter = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() - 1
                ).toISOString();
                state.endDateFilter = new Date().toISOString();
                break;
            case '3d':
                state.startDateFilter = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() - 3
                ).toISOString();
                state.endDateFilter = new Date().toISOString();
                break;
            case '1w':
                state.startDateFilter = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() - 7
                ).toISOString();
                state.endDateFilter = new Date().toISOString();
                break;
            case '1m':
                state.startDateFilter = new Date(
                    today.getFullYear(),
                    today.getMonth() - 1,
                    today.getDate()
                ).toISOString();
                state.endDateFilter = new Date().toISOString();
                break;
            case '1y':
                state.startDateFilter = new Date(
                    today.getFullYear() - 1,
                    today.getMonth(),
                    today.getDate()
                ).toISOString();
                state.endDateFilter = new Date().toISOString();
                break;
            default:
                state.startDateFilter = null;
                state.endDateFilter = null;
        }
    },
    addFilterModality(state: IStoreStudiesSlice, action: PayloadAction<string>) {
        state.selectedModalities.push(action.payload);
    },
    removeFilterModality(state: IStoreStudiesSlice, action: PayloadAction<string>) {
        state.selectedModalities = state.selectedModalities.filter((modality) => modality !== action.payload);
    }
};

export default filterStudiesReducers;
